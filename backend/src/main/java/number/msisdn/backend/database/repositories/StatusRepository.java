package number.msisdn.backend.database.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import number.msisdn.backend.database.entities.StatusEntity;

public interface StatusRepository extends JpaRepository<StatusEntity, Long> {
}