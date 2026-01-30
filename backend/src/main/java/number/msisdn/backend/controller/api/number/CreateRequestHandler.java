package number.msisdn.backend.controller.api.number;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.stereotype.Service;

import number.msisdn.backend.controller.requests.CreateRequest;
import number.msisdn.backend.controller.responses.CreateResponse;
import number.msisdn.backend.database.entities.NumberEntity;
import number.msisdn.backend.database.repositories.NumberRepository;
import number.msisdn.backend.general.BatchIdIO;
import number.msisdn.backend.general.FileUtility;

import org.springframework.beans.factory.annotation.Autowired;
import number.msisdn.backend.soap.SoapClient;
import number.msisdn.soapclient.Batch;
import number.msisdn.soapclient.Transaction;
import number.msisdn.soapclient.UnavailableException_Exception;
import number.msisdn.soapclient.UserException_Exception;

@Service
public class CreateRequestHandler {
    @Autowired
    private SoapClient soapClient;
   
    private  NumberRepository numberRepository;
    private BatchIdIO batchIdIO;
    // private SequenceIO sequenceIO;
    public CreateRequestHandler(NumberRepository numberRepository, BatchIdIO batchIdIO){
        this.numberRepository = numberRepository;
        this.batchIdIO = batchIdIO;
        // this.sequenceIO = sequenceIO;
    }

    public CreateResponse handle(CreateRequest request){
        List<NumberEntity> numberEntityList = numberRepository.findByTelephoneNumber(request.getTelephoneNumber());
        if(numberEntityList.size()>0){
            return new CreateResponse(false, "The number already exists.");
        }
        try {
            //Construct batch
            Batch batch = new Batch();
            batch.setId(batchIdIO.getBatchId()); // Or use unique ID generation
            //List<Transaction> transactions = new ArrayList<>();
            String operator = FileUtility.readOperator();
            String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
            // Long sequence = sequenceIO.getSequenceId();
            //Create one transaction
            Transaction tx = new Transaction();
            tx.setTransactionType("001"); // Typically "001" = Add/Port
            tx.setTelephoneNumber(request.getTelephoneNumber());
            // tx.setOriginatingOrderNumber(operator+sequence);
            tx.setOriginatingOrderNumber(operator + timestamp);
            tx.setRecipientNetworkOperator(request.getRecipientNetworkOperator());
            tx.setRecipientServiceOperator(request.getRecipientServiceOperator());
            if(request.getRequestedExecutionDate() != ""){
                tx.setRequestedExecutionDate(request.getRequestedExecutionDate());
            }
            tx.setPointOfConnection(request.getPointOfConnection());
            tx.setPriority(5);
            //tx.setRequestedExecutionDate(LocalDate.now().plusDays(2).toString());

            batch.getTransactions().add(tx);
            boolean result = soapClient.getPort().send(batch);
            if(result){
                // sequenceIO.setSequenceId(sequence+1);                
                batchIdIO.setBatchId(batchIdIO.getBatchId()+1);

                NumberEntity numberEntity = new NumberEntity();
                numberEntity.setOriginatingOrderNumber(operator+timestamp);
                numberEntity.setTelephoneNumber(request.getTelephoneNumber());
                numberEntity.setRecipientNetworkOperator(request.getRecipientNetworkOperator());
                numberEntity.setRecipientServiceOperator(request.getRecipientServiceOperator());
                numberEntity.setRequestedExecutionDate(request.getRequestedExecutionDate());
                numberEntity.setPointOfConnection(request.getPointOfConnection());
                numberEntity.setUserId(request.getUserId());
                numberRepository.save(numberEntity);
                return new CreateResponse(true, "");
            }else {
                return new CreateResponse(false, "Number porting request was not accepted by OCH");
            }
        } catch (UserException_Exception | UnavailableException_Exception e) {
            // System.out.println("Business error: " + e.getMessage());
            return new CreateResponse(false, "There is an exception in number porting request");
        } catch (Exception e) {
            e.printStackTrace();
            return new CreateResponse(false, "There is an exception in number porting request");
        }     
    }
}