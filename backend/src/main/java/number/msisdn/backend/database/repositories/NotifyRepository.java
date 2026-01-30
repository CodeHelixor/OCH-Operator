package number.msisdn.backend.database.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import number.msisdn.backend.database.entities.NotifyEntity;

public interface NotifyRepository extends JpaRepository<NotifyEntity, Long> {
}