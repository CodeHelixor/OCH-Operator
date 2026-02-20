package number.msisdn.backend.controller.api.number;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import number.msisdn.backend.controller.requests.ConfirmReqeust;
import number.msisdn.backend.database.entities.ConfirmationStatusEntity;
import number.msisdn.backend.database.entities.TasklistEntity;
import number.msisdn.backend.database.repositories.ConfirmationStatusRepository;
import number.msisdn.backend.database.repositories.TasklistRepository;
import number.msisdn.backend.general.BatchIdIO;
import number.msisdn.backend.general.OCHResponseLogger;
import number.msisdn.backend.soap.SoapClient;
import number.msisdn.soapclient.Batch;
import number.msisdn.soapclient.Transaction;
import number.msisdn.soapclient.UnavailableException_Exception;
import number.msisdn.soapclient.UserException_Exception;

@Service
public class ConfirmRequestHandler {
    @Autowired
    SoapClient soapClient;
    private TasklistRepository tasklistRepository;
    private ConfirmationStatusRepository confirmationStatusRepository;
    private BatchIdIO batchIdIO;
    
    public ConfirmRequestHandler(TasklistRepository tasklistRepository,BatchIdIO batchIdIO, ConfirmationStatusRepository confirmationStatusRepository){
        this.tasklistRepository = tasklistRepository;
        this.confirmationStatusRepository = confirmationStatusRepository;
        this.batchIdIO = batchIdIO;
    }

    public boolean handle(String originatingOrderNumber, ConfirmReqeust request){
        List<TasklistEntity> tasklists = tasklistRepository.findByOriginatingOrderNumber(originatingOrderNumber);
        TasklistEntity task = tasklists.get(0);
        try {
            Batch batch = new Batch();
            batch.setId(batchIdIO.getBatchId()); // Or use unique ID generation
            //Create one transaction
            // OCH expects uniqueId decremented by 1 for confirm (e.g. 2505534 -> 2505533)
            String currentUniqueId = task.getUniqueId();
            String sendUniqueId = currentUniqueId != null && !currentUniqueId.isEmpty()
                    ? String.valueOf(Long.parseLong(currentUniqueId) - 1)
                    : currentUniqueId;

            Transaction tx = new Transaction();
            tx.setTransactionType("004"); 
            tx.setTelephoneNumber(task.getTelephoneNumber());
            tx.setOchOrderNumber(task.getOchOrderNumber());
            tx.setUniqueId(sendUniqueId);
            tx.setOriginatingOrderNumber(task.getOriginatingOrderNumber());
            tx.setConfirmedExecutionDate(request.getConfirmedExecutionDate());
            // System.out.println(request.getConfirmationStatus());
            if(request.getConfirmationStatus()!=""){
                tx.setConfirmationStatus(Integer.parseInt(request.getConfirmationStatus()));
            }
            tx.setPriority(5);
            //tx.setRequestedExecutionDate(LocalDate.now().plusDays(2).toString());


            batch.getTransactions().add(tx);
            OCHResponseLogger.logSentBatch(batch, "Confirm (004)");
            boolean result = soapClient.getPort().send(batch);
            OCHResponseLogger.logOperationResult("SEND (Confirm 004)", result);
            if(result){
                batchIdIO.setBatchId(batchIdIO.getBatchId()+1);
                // Task keeps its current uniqueId; we only send (current - 1) to OCH for the confirm request
                task.setConfirmedExecutionDate(request.getConfirmedExecutionDate());
                if(request.getConfirmationStatus()!=""){
                ConfirmationStatusEntity status = confirmationStatusRepository.findById(Long.parseLong(request.getConfirmationStatus()))
                                            .orElseThrow(() -> new RuntimeException("Status not found"));
                task.setConfirmationStatus(status);
                }else{
                    task.setConfirmationStatus(null);
                }
                tasklistRepository.save(task);
                return true;
            }
        } catch (UserException_Exception | UnavailableException_Exception e) {
            OCHResponseLogger.logException("SEND (Confirm 004)", e);
            return false;
        } catch (Exception e) {
            OCHResponseLogger.logException("SEND (Confirm 004)", e);
            return false;
        }     
        return false;
    }
}