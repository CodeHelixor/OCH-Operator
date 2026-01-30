package number.msisdn.backend.database.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import number.msisdn.backend.database.entities.ErrorEntity;

public interface ErrorRepository extends JpaRepository<ErrorEntity, Long> {
    Optional<ErrorEntity> findByUniqueId(String uniqueId);
}