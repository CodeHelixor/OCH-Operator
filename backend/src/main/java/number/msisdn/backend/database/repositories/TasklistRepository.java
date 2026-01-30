package number.msisdn.backend.database.repositories;
import org.springframework.data.jpa.repository.JpaRepository;

import number.msisdn.backend.database.entities.TasklistEntity;
import java.util.List;


public interface TasklistRepository extends JpaRepository<TasklistEntity, Long> {
    // You can define custom query methods here if needed
    List<TasklistEntity> findByOriginatingOrderNumber(String originatingOrderNumber);
}
