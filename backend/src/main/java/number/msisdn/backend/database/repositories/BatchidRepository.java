package number.msisdn.backend.database.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import number.msisdn.backend.database.entities.BatchidEntity;

public interface BatchidRepository extends JpaRepository<BatchidEntity, Long> {
    
}
