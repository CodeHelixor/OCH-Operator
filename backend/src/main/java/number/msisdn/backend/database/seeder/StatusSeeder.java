package number.msisdn.backend.database.seeder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import number.msisdn.backend.database.entities.StatusEntity;
import number.msisdn.backend.database.repositories.StatusRepository;

@Component
public class StatusSeeder {
    @Autowired
    private StatusRepository statusRepository;

    @PostConstruct
    public void seedStatuses() {
        if (statusRepository.count() == 0) {
            statusRepository.save(new StatusEntity("Registered"));
            statusRepository.save(new StatusEntity("Ported In"));
            statusRepository.save(new StatusEntity("Ported Out"));
            // System.out.println("Seeded Status table.");
        } else {
            // System.out.println("Status table already seeded.");
        }
    }
}
