package number.msisdn.backend.database.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import number.msisdn.backend.database.entities.TasklistEntity;
import java.util.List;


public interface TasklistRepository extends JpaRepository<TasklistEntity, Long> {
    List<TasklistEntity> findByOriginatingOrderNumber(String originatingOrderNumber);

    @Query("SELECT t FROM TasklistEntity t WHERE t.recipientServiceOperator = :operator OR t.recipientNetworkOperator = :operator ORDER BY t.id DESC")
    List<TasklistEntity> findByRecipientOperatorOrderByIdDesc(@Param("operator") String operator);
}
