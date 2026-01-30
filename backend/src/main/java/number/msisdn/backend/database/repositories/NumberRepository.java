package number.msisdn.backend.database.repositories;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import number.msisdn.backend.database.entities.NumberEntity;

public interface NumberRepository extends JpaRepository<NumberEntity, Long> {
    // You can define custom query methods here if needed
    Optional<NumberEntity> findByOriginatingOrderNumber(String originatingOrderNumber);
    List<NumberEntity> findByTelephoneNumber(String telephoneNumber);
}