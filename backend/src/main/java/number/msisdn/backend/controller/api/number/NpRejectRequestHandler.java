package number.msisdn.backend.controller.api.number;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import number.msisdn.backend.controller.requests.NpRejectRequest;
import number.msisdn.backend.database.entities.NumberEntity;
import number.msisdn.backend.database.entities.TasklistEntity;
import number.msisdn.backend.database.repositories.NumberRepository;
import number.msisdn.backend.database.repositories.TasklistRepository;
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
 * On successful send, removes the related number and tasklist records from the database.
 */
@Service
public class NpRejectRequestHandler {

    /** OCH NP Reject transaction type. */
    private static final String NP_REJECT_TRANSACTION_TYPE = "006";

    @Autowired
    private SoapClient soapClient;

    private final BatchIdIO batchIdIO;
    private final NumberRepository numberRepository;
    private final TasklistRepository tasklistRepository;

    public NpRejectRequestHandler(BatchIdIO batchIdIO, NumberRepository numberRepository, TasklistRepository tasklistRepository) {
        this.batchIdIO = batchIdIO;
        this.numberRepository = numberRepository;
        this.tasklistRepository = tasklistRepository;
    }

    public boolean handle(NpRejectRequest request) {
        try {
            Batch batch = new Batch();
            batch.setId(batchIdIO.getBatchId());

            // OCH expects uniqueId incremented by 1 for NP Reject (e.g. 2503943 -> 2503944)
            String requestUniqueId = request.getUniqueId();
            String sendUniqueId = requestUniqueId != null && !requestUniqueId.isEmpty()
                    ? String.valueOf(Long.parseLong(requestUniqueId) + 1)
                    : requestUniqueId;

            Transaction tx = new Transaction();
            tx.setTransactionType(request.getTransactionType() != null && !request.getTransactionType().isEmpty()
                    ? request.getTransactionType() : NP_REJECT_TRANSACTION_TYPE);
            tx.setTelephoneNumber(request.getTelephoneNumber());
            tx.setOchOrderNumber(request.getOchOrderNumber());
            tx.setUniqueId(sendUniqueId);
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
            System.out.println("====================here======================");
            System.out.println("OCH NpReject send result: " + result);
            if (result) {
                batchIdIO.setBatchId(batchIdIO.getBatchId());
                removeRelatedData(request.getOriginatingOrderNumber());
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

    /**
     * Removes number and tasklist records linked to the given originating order number.
     * Called after OCH accepts the NP Reject so the database stays consistent.
     */
    private void removeRelatedData(String originatingOrderNumber) {
        if (originatingOrderNumber == null || originatingOrderNumber.isEmpty()) {
            return;
        }
        try {
            Optional<NumberEntity> numberOpt = numberRepository.findByOriginatingOrderNumber(originatingOrderNumber);
            if (numberOpt.isPresent()) {
                numberRepository.delete(numberOpt.get());
            }
            List<TasklistEntity> tasklists = tasklistRepository.findByOriginatingOrderNumber(originatingOrderNumber);
            if (!tasklists.isEmpty()) {
                tasklistRepository.deleteAll(tasklists);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
