package number.msisdn.backend.database.seeder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import number.msisdn.backend.database.entities.BatchidEntity;
import number.msisdn.backend.database.repositories.BatchidRepository;

@Component
public class BatchidSeeder {
    @Autowired
    private BatchidRepository batchidRepository;

    @PostConstruct
    public void seedBatchId(){
        if(batchidRepository.count() == 0){
            batchidRepository.save(new BatchidEntity(1L));
            // System.out.println("BatchId Status table.");
        }else {
            // System.out.println("Batchid table already seeded.");
        }
    }
}


