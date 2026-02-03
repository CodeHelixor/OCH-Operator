package number.msisdn.backend.database.repositories;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import number.msisdn.backend.database.entities.NumberEntity;

public interface NumberRepository extends JpaRepository<NumberEntity, Long> {
    Optional<NumberEntity> findByOriginatingOrderNumber(String originatingOrderNumber);
    List<NumberEntity> findByTelephoneNumber(String telephoneNumber);

    List<NumberEntity> findAllByOrderByIdDesc();

    @Query("SELECT n FROM NumberEntity n WHERE n.recipientServiceOperator = :operator OR n.recipientNetworkOperator = :operator ORDER BY n.id DESC")
    List<NumberEntity> findByRecipientOperatorOrderByIdDesc(@Param("operator") String operator);
}