package number.msisdn.backend.controller.api.number;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import number.msisdn.backend.controller.requests.CancelRequest;
import number.msisdn.backend.database.entities.NumberEntity;
import number.msisdn.backend.database.repositories.NumberRepository;
import number.msisdn.backend.general.BatchIdIO;
import number.msisdn.backend.soap.SoapClient;
import number.msisdn.soapclient.Batch;
import number.msisdn.soapclient.Transaction;
import number.msisdn.soapclient.UnavailableException_Exception;
import number.msisdn.soapclient.UserException_Exception;

@Service
public class CancelRequestHandler {
    @Autowired 
    private SoapClient soapClient;
    private NumberRepository numberRepository;
    private BatchIdIO batchIdIO;
    public CancelRequestHandler(NumberRepository numberRepository, BatchIdIO batchIdIO){
        this.numberRepository = numberRepository;
        this.batchIdIO = batchIdIO;
    }
    public boolean handle(CancelRequest request){
        try {
            System.out.println("===============================1======================================");
            Batch batch = new Batch();
            batch.setId(batchIdIO.getBatchId()); // Or use unique ID generation
            Transaction tx = new Transaction();
            tx.setTransactionType("007"); 
            tx.setTelephoneNumber(request.getTelephoneNumber());
            tx.setOchOrderNumber(request.getOchOrderNumber());
            
            System.out.println("===============================3======================================");
            tx.setUniqueId(request.getUniqueId());
            tx.setOriginatingOrderNumber(request.getOriginatingOrderNumber());
            tx.setPriority(5);
            batch.getTransactions().add(tx);
            boolean result = soapClient.getPort().send(batch);
            System.out.println("===============================2======================================");
            
            if(result){
                batchIdIO.setBatchId(batchIdIO.getBatchId()+1);
                try {
                    Optional<NumberEntity> numberEntity= numberRepository.findByOriginatingOrderNumber(request.getOriginatingOrderNumber());
                    if (numberEntity.isPresent()) {
                        numberRepository.delete(numberEntity.get());
                        return true;
                    } else {
                        return false; // Not found
                    }
                } catch (Exception e) {
                    return false;
                }
            }
            return false;
        }catch (UserException_Exception | UnavailableException_Exception e) {
            // System.out.println("Business error: " + e.getMessage());
            return false;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }     
    }
}
   
