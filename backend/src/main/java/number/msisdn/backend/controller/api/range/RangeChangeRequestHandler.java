package number.msisdn.backend.controller.api.range;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import number.msisdn.backend.controller.requests.RangeRequest;
import number.msisdn.backend.database.entities.RangeEntity;
import number.msisdn.backend.database.repositories.RangeRepository;
import number.msisdn.backend.general.BatchIdIO;
import number.msisdn.backend.general.FileUtility;
import number.msisdn.backend.soap.SoapClient;
import number.msisdn.soapclient.Batch;
import number.msisdn.soapclient.Transaction;
import number.msisdn.soapclient.UnavailableException_Exception;
import number.msisdn.soapclient.UserException_Exception;

@Service
public class RangeChangeRequestHandler {
    @Autowired 
    private SoapClient soapClient;
    private BatchIdIO batchIdIO;
    private RangeRepository rangeRepository;
    public RangeChangeRequestHandler (BatchIdIO batchIdIO, RangeRepository rangeRepository) {
        this.batchIdIO = batchIdIO;
        this.rangeRepository = rangeRepository;
    }
    public boolean handle(RangeRequest request){
        try {
            //Construct batch
            Batch batch = new Batch();
            batch.setId(batchIdIO.getBatchId()); // Or use unique ID generation
            String operator = FileUtility.readOperator();
            String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
            Transaction tx = new Transaction();
            tx.setTransactionType("014"); // Typically
            tx.setOriginatingOrderNumber(operator + timestamp);
            tx.setRangeUpdateType(request.getRangeUpdateType());
            tx.setRangeStart(request.getRangeStart());
            tx.setRangeEnd(request.getRangeEnd());
            tx.setOtherOperator(request.getOtherOperator());
            tx.setCurrentRangeHolder(request.getCurrentRangeHolder());
            tx.setCurrentNetworkOperator(request.getCurrentNetworkOperator());
            tx.setCurrentServiceOperator(request.getRecipientServiceOperator());
            tx.setPortingCase(request.getPortingCase());
            tx.setSpc(request.getSpc());
            tx.setMunicipality(request.getMunicipality());
            tx.setRoutingInfo(request.getRoutingInfo());
            tx.setChargingInfo(request.getChargingInfo());
            tx.setNewNumberType(request.getNewNumberType());
            tx.setPriority(2);
            //tx.setRequestedExecutionDate(LocalDate.now().plusDays(2).toString())
            batch.getTransactions().add(tx);
            boolean result = soapClient.getPort().send(batch);
            // System.out.println(result);
            if(result){
                // sequenceIO.setSequenceId(sequence+1);      
                try{
                    batchIdIO.setBatchId(batchIdIO.getBatchId()+1);
                    RangeEntity rangeEntity = new RangeEntity();
                    rangeEntity.setOriginatingOrderNumber(operator+timestamp);
                    rangeEntity.setRangeUpdateType(request.getRangeUpdateType());
                    rangeEntity.setRangeStart(request.getRangeStart());
                    rangeEntity.setRangeEnd(request.getRangeEnd());
                    rangeEntity.setPortingCase(request.getPortingCase());
                    rangeEntity.setOtherOperator(request.getOtherOperator());
                    rangeEntity.setCurrentRangeHolder(request.getCurrentRangeHolder());
                    rangeEntity.setCurrentNetworkOperator(request.getCurrentNetworkOperator());
                    rangeEntity.setRecipientServiceOperator(request.getRecipientServiceOperator());
                    rangeEntity.setSpc(request.getSpc());
                    rangeEntity.setMunicipality(request.getMunicipality());
                    rangeEntity.setRoutingInfo(request.getRoutingInfo());
                    rangeEntity.setChargingInfo(request.getChargingInfo());
                    rangeEntity.setNewNumberType(request.getNewNumberType());
                    rangeEntity.setUserId(request.getUserId());
                    rangeRepository.save(rangeEntity);
                } catch(Exception e){
                    return false;
                }      
                
            }
            return result;
        } catch (UserException_Exception | UnavailableException_Exception e) {
            // System.out.println("Business error: " + e.getMessage());
            return false;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }     
    }
}

