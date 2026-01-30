package number.msisdn.backend.database.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import number.msisdn.backend.database.entities.IchRangeEntity;

public interface IchRangeRepository extends JpaRepository<IchRangeEntity, Long> {
    @Query(
      value = """
              SELECT *
              FROM ichrangetable
              WHERE end_date IS NULL OR end_date = ''
              ORDER BY CAST(range_start AS UNSIGNED)
              """,
      nativeQuery = true
    )
    List<IchRangeEntity> findOpenRangesOrderByRangeStartAsNumber();
}