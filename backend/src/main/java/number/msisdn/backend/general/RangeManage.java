package number.msisdn.backend.general;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import number.msisdn.backend.database.entities.IchRangeEntity;
import number.msisdn.backend.database.entities.RangeEntity;
import number.msisdn.backend.database.repositories.IchRangeRepository;

@Service
public class RangeManage {
    @Autowired
    private IchRangeRepository ichRangeRepository;

    public void insert(RangeEntity entity){
        List<IchRangeEntity> rangeEntities = ichRangeRepository.findOpenRangesOrderByRangeStartAsNumber();
        long newStartNumber = Long.parseLong(entity.getRangeStart());
        long newEndNumber = Long.parseLong(entity.getRangeEnd());

        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d MMM yyyy HH:mm:ss", Locale.GERMANY);
        String formattedDateTime = now.format(formatter);

        IchRangeEntity newEntity = new IchRangeEntity();  
        newEntity.setRangeStart(entity.getRangeStart());
        newEntity.setRangeEnd(entity.getRangeEnd());

        for(int i = 0; i < rangeEntities.size(); i++){
            IchRangeEntity currentEntity = rangeEntities.get(i);
            long startNumber = Long.parseLong(currentEntity.getRangeStart());
            long endNumber = Long.parseLong(currentEntity.getRangeEnd());
            boolean[] flags = {
                Objects.equals(entity.getSpc(), currentEntity.getSpc()),
                Objects.equals(entity.getMunicipality(), currentEntity.getMunicipality()),
                Objects.equals(entity.getRoutingInfo(), currentEntity.getRoutingInfo()),
                Objects.equals(entity.getChargingInfo(), currentEntity.getChargingInfo()),
                Objects.equals(entity.getNewNumberType(), currentEntity.getNumberType()),
                Objects.equals(entity.getCurrentRangeHolder(), currentEntity.getRangeHolderId()),
                Objects.equals(entity.getCurrentNetworkOperator(), currentEntity.getNetworkOperator()),
                Objects.equals(entity.getRecipientServiceOperator(), currentEntity.getServiceOperator())
            };
            
            boolean isEqual = true;
            for(boolean value:flags){
                if(!value) isEqual = false; 
            }
            if(isEqual){
                if(endNumber == newStartNumber - 1){
                    currentEntity.setEndDate(formattedDateTime);
                    ichRangeRepository.save(currentEntity);
                    newEntity.setRangeStart(currentEntity.getRangeStart());
                }
                if(startNumber == newEndNumber + 1){
                    currentEntity.setEndDate(formattedDateTime);
                    ichRangeRepository.save(currentEntity);
                    newEntity.setRangeEnd(currentEntity.getRangeEnd());
                }
            }
          
        }

        newEntity.setStartDate(formattedDateTime);
        newEntity.setRangeHolderId(entity.getCurrentRangeHolder());
        newEntity.setServiceOperator(entity.getRecipientServiceOperator());
        newEntity.setNetworkOperator(entity.getCurrentNetworkOperator());
        newEntity.setLubo(entity.getOtherOperator());
        newEntity.setNumberType(entity.getNewNumberType());
        newEntity.setSpc(entity.getSpc());
        newEntity.setMunicipality(entity.getMunicipality());
        newEntity.setChargingInfo(entity.getChargingInfo());
        newEntity.setRoutingInfo(entity.getRoutingInfo());
        newEntity.setPortingCase(entity.getPortingCase());
        newEntity.setOchOrderNumber(entity.getOchOrderNumber());
        newEntity.setEndDate("");

        ichRangeRepository.save(newEntity);
    }
    

    public void delete(RangeEntity entity){
        List<IchRangeEntity> rangeEntities = ichRangeRepository.findOpenRangesOrderByRangeStartAsNumber();
        long newStartNumber = Long.parseLong(entity.getRangeStart());
        long newEndNumber = Long.parseLong(entity.getRangeEnd());
        for(int i = 0; i < rangeEntities.size(); i++){
            IchRangeEntity currentEntity = rangeEntities.get(i);
            long startNumber = Long.parseLong(currentEntity.getRangeStart());
            long endNumber = Long.parseLong(currentEntity.getRangeEnd());

            if(newStartNumber >= startNumber && newEndNumber <= endNumber){
                //End this range, set the endtime to this range
                LocalDateTime now = LocalDateTime.now();
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d MMM yyyy HH:mm:ss", Locale.GERMANY);
                String formattedDateTime = now.format(formatter);
                currentEntity.setEndDate(formattedDateTime);
                ichRangeRepository.save(currentEntity);

                if(newStartNumber != startNumber){
                    IchRangeEntity newEntity = new IchRangeEntity();
                    newEntity.setRangeStart(currentEntity.getRangeStart());
                    newEntity.setRangeEnd(String.valueOf(newStartNumber - 1));
                    newEntity.setStartDate(formattedDateTime);
                    newEntity.setRangeHolderId(currentEntity.getRangeHolderId());
                    newEntity.setServiceOperator(currentEntity.getServiceOperator());
                    newEntity.setNetworkOperator(currentEntity.getNetworkOperator());
                    newEntity.setLubo(currentEntity.getLubo());
                    newEntity.setNumberType(currentEntity.getNumberType());
                    newEntity.setSpc(currentEntity.getSpc());
                    newEntity.setMunicipality(currentEntity.getMunicipality());
                    newEntity.setChargingInfo(currentEntity.getChargingInfo());
                    newEntity.setRoutingInfo(currentEntity.getRoutingInfo());
                    newEntity.setPortingCase(currentEntity.getPortingCase());
                    newEntity.setOchOrderNumber(currentEntity.getOchOrderNumber());
                    newEntity.setEndDate("");
                    ichRangeRepository.save(newEntity);
                }

                if(newEndNumber != endNumber){
                    IchRangeEntity newEntity = new IchRangeEntity();   
                    newEntity.setRangeStart(String.valueOf(newEndNumber + 1));
                    newEntity.setRangeEnd(currentEntity.getRangeEnd());
                    newEntity.setStartDate(formattedDateTime);
                     newEntity.setRangeHolderId(currentEntity.getRangeHolderId());
                    newEntity.setServiceOperator(currentEntity.getServiceOperator());
                    newEntity.setNetworkOperator(currentEntity.getNetworkOperator());
                    newEntity.setLubo(currentEntity.getLubo());
                    newEntity.setNumberType(currentEntity.getNumberType());
                    newEntity.setSpc(currentEntity.getSpc());
                    newEntity.setMunicipality(currentEntity.getMunicipality());
                    newEntity.setChargingInfo(currentEntity.getChargingInfo());
                    newEntity.setRoutingInfo(currentEntity.getRoutingInfo());
                    newEntity.setPortingCase(currentEntity.getPortingCase());
                    newEntity.setOchOrderNumber(currentEntity.getOchOrderNumber());
                    newEntity.setEndDate("");
                    ichRangeRepository.save(newEntity);
                }
            }           
        }
    }

    public void update(RangeEntity entity){
        List<IchRangeEntity> rangeEntities = ichRangeRepository.findOpenRangesOrderByRangeStartAsNumber();
        long newStartNumber = Long.parseLong(entity.getRangeStart());
        long newEndNumber = Long.parseLong(entity.getRangeEnd());

        boolean isSplitted = false;
        for(int i = 0; i < rangeEntities.size(); i++){
            IchRangeEntity currentEntity = rangeEntities.get(i);
            long startNumber = Long.parseLong(currentEntity.getRangeStart());
            long endNumber = Long.parseLong(currentEntity.getRangeEnd());

            if(newStartNumber >= startNumber && newEndNumber <= endNumber){
                //End this range, set the endtime to this range
                LocalDateTime now = LocalDateTime.now();
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d MMM yyyy HH:mm:ss", Locale.GERMANY);
                String formattedDateTime = now.format(formatter);
                currentEntity.setEndDate(formattedDateTime);
                ichRangeRepository.save(currentEntity);

                if(newStartNumber != startNumber){
                    IchRangeEntity newStartEntity = new IchRangeEntity();
                    newStartEntity.setRangeStart(currentEntity.getRangeStart());
                    newStartEntity.setRangeEnd(String.valueOf(newStartNumber - 1));
                    newStartEntity.setStartDate(formattedDateTime);
                    newStartEntity.setRangeHolderId(currentEntity.getRangeHolderId());
                    newStartEntity.setServiceOperator(currentEntity.getServiceOperator());
                    newStartEntity.setNetworkOperator(currentEntity.getNetworkOperator());
                    newStartEntity.setLubo(currentEntity.getLubo());
                    newStartEntity.setNumberType(currentEntity.getNumberType());
                    newStartEntity.setSpc(currentEntity.getSpc());
                    newStartEntity.setMunicipality(currentEntity.getMunicipality());
                    newStartEntity.setChargingInfo(currentEntity.getChargingInfo());
                    newStartEntity.setRoutingInfo(currentEntity.getRoutingInfo());
                    newStartEntity.setPortingCase(currentEntity.getPortingCase());
                    newStartEntity.setOchOrderNumber(currentEntity.getOchOrderNumber());
                    newStartEntity.setEndDate("");
                    ichRangeRepository.save(newStartEntity);
                    isSplitted =true;
                }

                if(newEndNumber != endNumber){
                    IchRangeEntity newEndEntity = new IchRangeEntity();   
                    newEndEntity.setRangeStart(String.valueOf(newEndNumber + 1));
                    newEndEntity.setRangeEnd(currentEntity.getRangeEnd());
                    newEndEntity.setStartDate(formattedDateTime);
                    newEndEntity.setRangeHolderId(currentEntity.getRangeHolderId());
                    newEndEntity.setServiceOperator(currentEntity.getServiceOperator());
                    newEndEntity.setNetworkOperator(currentEntity.getNetworkOperator());
                    newEndEntity.setLubo(currentEntity.getLubo());
                    newEndEntity.setNumberType(currentEntity.getNumberType());
                    newEndEntity.setSpc(currentEntity.getSpc());
                    newEndEntity.setMunicipality(currentEntity.getMunicipality());
                    newEndEntity.setChargingInfo(currentEntity.getChargingInfo());
                    newEndEntity.setRoutingInfo(currentEntity.getRoutingInfo());
                    newEndEntity.setPortingCase(currentEntity.getPortingCase());
                    newEndEntity.setOchOrderNumber(currentEntity.getOchOrderNumber());
                    newEndEntity.setEndDate("");
                    ichRangeRepository.save(newEndEntity);
                    isSplitted =true;
                }
                
                if(isSplitted){
                    IchRangeEntity newEntity = new IchRangeEntity();
                    newEntity.setRangeStart(String.valueOf(newStartNumber));
                    newEntity.setRangeEnd(String.valueOf(newEndNumber ));
                    newEntity.setStartDate(formattedDateTime);
                    newEntity.setRangeHolderId(entity.getCurrentRangeHolder());
                    newEntity.setServiceOperator(entity.getRecipientServiceOperator());
                    newEntity.setNetworkOperator(entity.getCurrentNetworkOperator());
                    newEntity.setLubo(entity.getOtherOperator());
                    newEntity.setNumberType(entity.getNewNumberType());
                    newEntity.setSpc(entity.getSpc());
                    newEntity.setMunicipality(entity.getMunicipality());
                    newEntity.setChargingInfo(entity.getChargingInfo());
                    newEntity.setRoutingInfo(entity.getRoutingInfo());
                    newEntity.setPortingCase(entity.getPortingCase());
                    newEntity.setOchOrderNumber(currentEntity.getOchOrderNumber());
                    newEntity.setEndDate("");
                    ichRangeRepository.save(newEntity);
                }
            }           
        }

        if(!isSplitted){
            LocalDateTime now = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d MMM yyyy HH:mm:ss", Locale.GERMANY);
            String formattedDateTime = now.format(formatter);

            IchRangeEntity newEntity = new IchRangeEntity();  
            newEntity.setRangeStart(entity.getRangeStart());
            newEntity.setRangeEnd(entity.getRangeEnd());

            for(int i = 0; i < rangeEntities.size(); i++){
                IchRangeEntity currentEntity = rangeEntities.get(i);
                long startNumber = Long.parseLong(currentEntity.getRangeStart());
                long endNumber = Long.parseLong(currentEntity.getRangeEnd());
                boolean[] flags = {
                    Objects.equals(entity.getSpc(), currentEntity.getSpc()),
                    Objects.equals(entity.getMunicipality(), currentEntity.getMunicipality()),
                    Objects.equals(entity.getRoutingInfo(), currentEntity.getRoutingInfo()),
                    Objects.equals(entity.getChargingInfo(), currentEntity.getChargingInfo()),
                    Objects.equals(entity.getNewNumberType(), currentEntity.getNumberType()),
                    Objects.equals(entity.getCurrentRangeHolder(), currentEntity.getRangeHolderId()),
                    Objects.equals(entity.getCurrentNetworkOperator(), currentEntity.getNetworkOperator()),
                    Objects.equals(entity.getRecipientServiceOperator(), currentEntity.getServiceOperator())
                };
                
                boolean isEqual = true;
                for(boolean value:flags){
                    if(!value) isEqual = false; 
                }
                if(isEqual){
                    if(endNumber == newStartNumber - 1){
                        currentEntity.setEndDate(formattedDateTime);
                        ichRangeRepository.save(currentEntity);
                        newEntity.setRangeStart(currentEntity.getRangeStart());
                    }
                    if(startNumber == newEndNumber + 1){
                        currentEntity.setEndDate(formattedDateTime);
                        ichRangeRepository.save(currentEntity);
                        newEntity.setRangeEnd(currentEntity.getRangeEnd());
                    }
                }
            
            }

            newEntity.setStartDate(formattedDateTime);
            newEntity.setRangeHolderId(entity.getCurrentRangeHolder());
            newEntity.setServiceOperator(entity.getRecipientServiceOperator());
            newEntity.setNetworkOperator(entity.getCurrentNetworkOperator());
            newEntity.setLubo(entity.getOtherOperator());
            newEntity.setNumberType(entity.getNewNumberType());
            newEntity.setSpc(entity.getSpc());
            newEntity.setMunicipality(entity.getMunicipality());
            newEntity.setChargingInfo(entity.getChargingInfo());
            newEntity.setRoutingInfo(entity.getRoutingInfo());
            newEntity.setPortingCase(entity.getPortingCase());
            newEntity.setOchOrderNumber(entity.getOchOrderNumber());
            newEntity.setEndDate("");

            ichRangeRepository.save(newEntity);
        }
    }
}
