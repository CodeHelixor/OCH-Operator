package number.msisdn.backend.controller.api.number;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import number.msisdn.backend.controller.requests.CancelRequest;
import number.msisdn.backend.database.entities.NumberEntity;
import number.msisdn.backend.database.entities.TasklistEntity;
import number.msisdn.backend.database.repositories.NumberRepository;
import number.msisdn.backend.database.repositories.TasklistRepository;
import number.msisdn.backend.general.BatchIdIO;
import number.msisdn.backend.general.OCHResponseLogger;
import number.msisdn.backend.soap.SoapClient;
import number.msisdn.soapclient.Batch;
import number.msisdn.soapclient.Transaction;
import number.msisdn.soapclient.UnavailableException_Exception;
import number.msisdn.soapclient.UserException_Exception;

@Service
public class CancelRequestHandler {
    @Autowired 
    private SoapClient soapClient;
    private final NumberRepository numberRepository;
    private final TasklistRepository tasklistRepository;
    private final BatchIdIO batchIdIO;

    public CancelRequestHandler(NumberRepository numberRepository, TasklistRepository tasklistRepository, BatchIdIO batchIdIO){
        this.numberRepository = numberRepository;
        this.tasklistRepository = tasklistRepository;
        this.batchIdIO = batchIdIO;
    }
    public boolean handle(CancelRequest request){
        try {
            // System.out.println("===============================1======================================");
            Batch batch = new Batch();
            batch.setId(batchIdIO.getBatchId()); // Or use unique ID generation
            Transaction tx = new Transaction();
            tx.setTransactionType("007"); 
            tx.setTelephoneNumber(request.getTelephoneNumber());
            tx.setOchOrderNumber(request.getOchOrderNumber());
            
            // System.out.println("===============================3======================================");
            tx.setUniqueId(request.getUniqueId());
            tx.setOriginatingOrderNumber(request.getOriginatingOrderNumber());
            tx.setPriority(5);
            batch.getTransactions().add(tx);
            OCHResponseLogger.logSentBatch(batch, "Cancel (007)");
            boolean result = soapClient.getPort().send(batch);
            OCHResponseLogger.logOperationResult("SEND (Cancel 007)", result);
            if(result){
                batchIdIO.setBatchId(batchIdIO.getBatchId()+1);
                removeRelatedData(request.getOriginatingOrderNumber());
                return true;
            }
            return false;
        }catch (UserException_Exception | UnavailableException_Exception e) {
            OCHResponseLogger.logException("SEND (Cancel 007)", e);
            return false;
        } catch (Exception e) {
            OCHResponseLogger.logException("SEND (Cancel 007)", e);
            return false;
        }     
    }

    /**
     * Removes number and tasklist records linked to the given originating order number.
     * Called when OCH Cancel send result is true so tasklisttable stays consistent.
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
   
