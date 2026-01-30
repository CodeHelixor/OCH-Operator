package number.msisdn.backend.database.seeder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import number.msisdn.backend.database.entities.ConfirmationStatusEntity;
import number.msisdn.backend.database.repositories.ConfirmationStatusRepository;

@Component
public class ConfirmationStatusSeeder {
    @Autowired
    private ConfirmationStatusRepository confirmationStatusRepository;

    @PostConstruct
    public void seedStatuses() {
        if (confirmationStatusRepository.count() == 0) {
            confirmationStatusRepository.save(new ConfirmationStatusEntity("Too early according to Rules & Procedures"));
            confirmationStatusRepository.save(new ConfirmationStatusEntity("Termination period is violated"));
            confirmationStatusRepository.save(new ConfirmationStatusEntity("Contract period is violated"));
            confirmationStatusRepository.save(new ConfirmationStatusEntity("Date moved due to excessive load"));
            // System.out.println("Seeded Status table.");
        } else {
            // System.out.println("Confirmation Status table already seeded.");
        }
    }
}
