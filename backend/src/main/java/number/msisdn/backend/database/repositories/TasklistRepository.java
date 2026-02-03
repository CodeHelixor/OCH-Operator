package number.msisdn.backend.database.repositories;
import org.springframework.data.jpa.repository.JpaRepository;

import number.msisdn.backend.database.entities.TasklistEntity;
import java.util.List;


public interface TasklistRepository extends JpaRepository<TasklistEntity, Long> {
    List<TasklistEntity> findByOriginatingOrderNumber(String originatingOrderNumber);

    List<TasklistEntity> findAllByOrderByIdDesc();
}
