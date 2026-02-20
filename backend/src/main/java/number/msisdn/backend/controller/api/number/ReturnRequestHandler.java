package number.msisdn.backend.controller.api.number;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import number.msisdn.backend.controller.requests.ReturnRequest;
import number.msisdn.backend.general.BatchIdIO;
import number.msisdn.backend.general.OCHResponseLogger;
import number.msisdn.backend.soap.SoapClient;
import number.msisdn.soapclient.Batch;
import number.msisdn.soapclient.Comment;
import number.msisdn.soapclient.Series;
import number.msisdn.soapclient.Transaction;
import number.msisdn.soapclient.UnavailableException_Exception;
import number.msisdn.soapclient.UserException_Exception;

/**
 * Handles NP Return (TransactionType 012) requests.
 * Sends to OCH: TransactionType=012, TelephoneNumber, OriginatingOrderNumber, SeriesCount, Series*, Comment*.
 */
@Service
public class ReturnRequestHandler {

    @Autowired
    private SoapClient soapClient;
    private final BatchIdIO batchIdIO;

    public ReturnRequestHandler(BatchIdIO batchIdIO) {
        this.batchIdIO = batchIdIO;
    }

    public boolean handle(String originatingOrderNumber, ReturnRequest request) {
        if (request == null) return false;
        try {
            Batch batch = new Batch();
            batch.setId(batchIdIO.getBatchId());

            Transaction tx = new Transaction();
            tx.setTransactionType("012");
            tx.setTelephoneNumber(request.getTelephoneNumber());
            tx.setOriginatingOrderNumber(request.getOriginatingOrderNumber() != null
                    ? request.getOriginatingOrderNumber()
                    : originatingOrderNumber);
            tx.setPriority(5);

            if (request.getSeries() != null && !request.getSeries().isEmpty()) {
                for (ReturnRequest.SeriesEntry entry : request.getSeries()) {
                    Series s = new Series();
                    s.setStart(entry.getStart());
                    s.setEnd(entry.getEnd());
                    tx.getSeries().add(s);
                }
            }

            if (request.getComments() != null && !request.getComments().isEmpty()) {
                for (String text : request.getComments()) {
                    Comment c = new Comment();
                    c.setText(text != null ? text : "");
                    tx.getComments().add(c);
                }
            }

            batch.getTransactions().add(tx);
            OCHResponseLogger.logSentBatch(batch, "NP Return (012)");
            boolean result = soapClient.getPort().send(batch);
            OCHResponseLogger.logOperationResult("SEND (NP Return 012)", result);
            if (result) {
                batchIdIO.setBatchId(batchIdIO.getBatchId() + 1);
                return true;
            }
            return false;
        } catch (UserException_Exception | UnavailableException_Exception e) {
            OCHResponseLogger.logException("SEND (NP Return 012)", e);
            return false;
        } catch (Exception e) {
            OCHResponseLogger.logException("SEND (NP Return 012)", e);
            return false;
        }
    }
}
