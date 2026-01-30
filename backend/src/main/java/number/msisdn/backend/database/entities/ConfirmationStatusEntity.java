package number.msisdn.backend.database.entities;
import jakarta.persistence.*;

@Entity
@Table(name="confirmationstatustable")
public class ConfirmationStatusEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String value;

    //Constructors, Getters, Setters,
    public ConfirmationStatusEntity(){}
    public ConfirmationStatusEntity(String value){
        this.value = value;
    }

    public long getId(){return id;}
    public void setId(Long id){this.id = id;}

    public String getValue(){
        return value;
    }
    public void setValue(String value){
        this.value = value;
    }
}
