package number.msisdn.backend.database.entities;
import jakarta.persistence.*;

@Entity
@Table(name="batchidtable")
public class BatchidEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Long batchId;

    public BatchidEntity(){}
    public BatchidEntity(Long batchId){
        this.batchId = batchId;
    }

    public long getId(){return id;}
    public void setId(Long id){this.id = id;}

    public Long getBatchId(){
        return batchId;
    }

    public void setBatchId(Long batchId){
        this.batchId = batchId;
    }
}


