package number.msisdn.backend.controller.api.number;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import number.msisdn.backend.controller.requests.CompleteRequest;
import number.msisdn.backend.database.entities.NumberEntity;
import number.msisdn.backend.database.entities.StatusEntity;
import number.msisdn.backend.database.entities.TasklistEntity;
import number.msisdn.backend.database.repositories.NumberRepository;
import number.msisdn.backend.database.repositories.StatusRepository;
import number.msisdn.backend.database.repositories.TasklistRepository;
import number.msisdn.backend.general.BatchIdIO;
import number.msisdn.backend.general.FileUtility;
import number.msisdn.backend.soap.SoapClient;
import number.msisdn.soapclient.Batch;
import number.msisdn.soapclient.Transaction;
import number.msisdn.soapclient.UnavailableException_Exception;
import number.msisdn.soapclient.UserException_Exception;

@Service
public class CompletionRequestHandler {
    @Autowired
    SoapClient soapClient;
    private TasklistRepository tasklistRepository;
    private NumberRepository numberRepository;
    private StatusRepository statusRepository;
    private BatchIdIO batchIdIO;
    
    public CompletionRequestHandler(NumberRepository numberRepository, StatusRepository statusRepository, TasklistRepository tasklistRepository,BatchIdIO batchIdIO){
        this.numberRepository = numberRepository;
        this.statusRepository = statusRepository;
        this.tasklistRepository = tasklistRepository;
        this.batchIdIO = batchIdIO;
    }

    public boolean handle(String originatingOrderNumber, CompleteRequest request){
        List<TasklistEntity> tasklists = tasklistRepository.findByOriginatingOrderNumber(originatingOrderNumber);
        TasklistEntity task = tasklists.get(0);
        try {
            Batch batch = new Batch();
            batch.setId(batchIdIO.getBatchId()); // Or use unique ID generation
            Transaction tx = new Transaction();
            tx.setTransactionType("008"); // Typically "001" = Add/Port
            tx.setTelephoneNumber(request.getTelephoneNumber());
            tx.setOchOrderNumber(request.getOchOrderNumber());
            tx.setUniqueId(request.getUniqueId());
            tx.setOriginatingOrderNumber(request.getOriginatingOrderNumber());
            tx.setRecipientNetworkOperator(request.getRecipientNetworkOperator());
            tx.setRecipientServiceOperator(request.getRecipientServiceOperator());
            tx.setPortingCase(request.getPortingCase());
            tx.setSpc(request.getSpc());
            tx.setMunicipality(request.getMunicipality());
            tx.setRoutingInfo(request.getRoutingInfo());
            tx.setChargingInfo(request.getChargingInfo());
            tx.setNewNumberType(request.getNewNumberType());
            tx.setNumberPorted(request.getNumberPorted());
            tx.setPriority(2);
            //tx.setRequestedExecutionDate(LocalDate.now().plusDays(2).toString());

            batch.getTransactions().add(tx);
            boolean result = soapClient.getPort().send(batch);
            System.out.println("====================here======================");
            System.out.println("OCH Completion send result: " + result);
            if(result){
                batchIdIO.setBatchId(batchIdIO.getBatchId()+1);
                Optional<NumberEntity> optionalNumberEntity = numberRepository.findByOriginatingOrderNumber(request.getOriginatingOrderNumber());
                if(optionalNumberEntity.isPresent()){
                    NumberEntity entity = optionalNumberEntity.get();
                    StatusEntity status = statusRepository.findById(2L)
                                        .orElseThrow(() -> new RuntimeException("Status not found"));
                    entity.setStatus(status);
                    numberRepository.save(entity);
                }
                // task.setIsCompleted(true);
                // tasklistRepository.save(task);
                return true;
            }
        } catch (UserException_Exception | UnavailableException_Exception e) {
            // System.out.println("Completion error: " + e.getMessage());
            return false;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }     
        return false;
    }
}
