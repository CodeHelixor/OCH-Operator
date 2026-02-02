package number.msisdn.backend.controller.api.number;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import number.msisdn.backend.controller.requests.NpRejectRequest;
import number.msisdn.backend.general.BatchIdIO;
import number.msisdn.backend.soap.SoapClient;
import number.msisdn.soapclient.Batch;
import number.msisdn.soapclient.Reject;
import number.msisdn.soapclient.Transaction;
import number.msisdn.soapclient.UnavailableException_Exception;
import number.msisdn.soapclient.UserException_Exception;

/**
 * Sends NP Reject transaction (TransactionType 006) to OCH.
 * Required: TransactionType "006", TelephoneNumber, RejectCode, RejectText; order identifiers for linking to NP Create.
 */
@Service
public class NpRejectRequestHandler {

    /** OCH NP Reject transaction type. */
    private static final String NP_REJECT_TRANSACTION_TYPE = "006";

    @Autowired
    private SoapClient soapClient;

    private final BatchIdIO batchIdIO;

    public NpRejectRequestHandler(BatchIdIO batchIdIO) {
        this.batchIdIO = batchIdIO;
    }

    public boolean handle(NpRejectRequest request) {
        try {
            Batch batch = new Batch();
            batch.setId(batchIdIO.getBatchId());

            Transaction tx = new Transaction();
            tx.setTransactionType(request.getTransactionType() != null && !request.getTransactionType().isEmpty()
                    ? request.getTransactionType() : NP_REJECT_TRANSACTION_TYPE);
            tx.setTelephoneNumber(request.getTelephoneNumber());
            tx.setOchOrderNumber(request.getOchOrderNumber());
            tx.setUniqueId(request.getUniqueId());
            tx.setOriginatingOrderNumber(request.getOriginatingOrderNumber());
            if (request.getOtherOperator() != null) {
                tx.setOtherOperator(request.getOtherOperator());
            }
            tx.setPriority(5);

            Reject reject = new Reject();
            reject.setCode(request.getRejectCode());
            reject.setText(request.getRejectText() != null ? request.getRejectText() : "");
            tx.getRejects().add(reject);

            batch.getTransactions().add(tx);
            boolean result = soapClient.getPort().send(batch);

            if (result) {
                batchIdIO.setBatchId(batchIdIO.getBatchId() + 1);
                return true;
            }
            return false;
        } catch (UserException_Exception | UnavailableException_Exception e) {
            return false;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
