package number.msisdn.backend.database.repositories;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import number.msisdn.backend.database.entities.RangeEntity;

public interface RangeRepository extends JpaRepository<RangeEntity, Long> {
    Optional<RangeEntity> findByOriginatingOrderNumber(String originatingOrderNumber);
}