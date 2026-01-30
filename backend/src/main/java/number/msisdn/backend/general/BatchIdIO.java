package number.msisdn.backend.general;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import number.msisdn.backend.database.entities.BatchidEntity;
import number.msisdn.backend.database.repositories.BatchidRepository;

@Component
public class BatchIdIO {
    @Autowired
    private BatchidRepository batchidRepository;

    public Long getBatchId(){
        return batchidRepository.findAll().stream().map(BatchidEntity::getBatchId).findFirst().orElse(null);
    }
    public void setBatchId(Long batchId){
        Optional<BatchidEntity> optionalEntity = batchidRepository.findAll().stream().findFirst();
        if(optionalEntity.isPresent()){
            BatchidEntity entity = optionalEntity.get();
            entity.setBatchId(batchId);
            batchidRepository.save(entity);
        }
    }
}
