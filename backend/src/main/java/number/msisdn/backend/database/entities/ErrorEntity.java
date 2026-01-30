package number.msisdn.backend.database.entities;

import number.msisdn.soapclient.Error;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "errortable")
public class ErrorEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String transactionType;
    private String telephoneNumber;
    private String ochOrderNumber;
    private String uniqueId;
    private String originatingOrderNumber;
    private boolean isViewed;
    private String createdAt;
    private String userId;

    @Column(columnDefinition = "json")
    // @Lob
    @Convert(converter = ErrorListConverter.class)
    // @Column(nullable = false, updatable = false)
    private List<Error> errors;


    public ErrorEntity(){}
    public ErrorEntity(String transactionType, String telephoneNumber, String ochOrderNumber, String uniqueId, String originatingOrderNumber){
        this.transactionType = transactionType;
        this.telephoneNumber = telephoneNumber;
        this.ochOrderNumber = ochOrderNumber;
        this.uniqueId = uniqueId;
        this.originatingOrderNumber = originatingOrderNumber;
    }

    public String getTransactionType(){
        return this.transactionType;
    }
    public void setTransactionType(String transactionType){
        this.transactionType = transactionType;
    }


    public String getTelephoneNumber(){
        return this.telephoneNumber;
    }
    public void setTelephoneNumber(String telephoneNumber){
        this.telephoneNumber = telephoneNumber;
    }

    public String getOchOrderNumber(){
        return this.ochOrderNumber;
    }
    public void setOchOrderNumber(String ochOrderNumber){
        this.ochOrderNumber = ochOrderNumber;
    }

    public String getUniqueId(){
        return this.uniqueId;
    }
    public void setUniqueId(String uniqueId){
        this.uniqueId = uniqueId;
    }

    public String getOriginatingOrderNumber(){
        return this.originatingOrderNumber;
    }
    public void setOriginatingOrderNumber(String originatingOrderNumber){
        this.originatingOrderNumber = originatingOrderNumber;
    }

    public boolean getIsViewed(){
        return this.isViewed;
    }
    public void setIsViewed(boolean isViewed){
        this.isViewed = isViewed;
    }

    public List<Error> getErrors(){
        return this.errors;
    }
    public void setErrors(List<Error> errors){
        this.errors = errors;
    }

    public String getCreatedAt(){
        return createdAt;
    }

    public void setCreatedAt(String createdAt){
        this.createdAt = createdAt;
    }

    public String getUserId(){
        return userId;
    }

    public void setUserId(String userId){
        this.userId = userId;
    }

    @PrePersist
    protected void onCreate(){
        this.createdAt = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss"));
    }
}
