package number.msisdn.backend.database.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import number.msisdn.backend.database.entities.ConfirmationStatusEntity;

public interface ConfirmationStatusRepository extends JpaRepository<ConfirmationStatusEntity, Long> {
}