package number.msisdn.backend.database.entities;

import jakarta.persistence.*;

@Entity
@Table(name="numbertable")
public class NumberEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String telephoneNumber;
    private String ochOrderNumber;
    private String uniqueId;
    private String originatingOrderNumber;
    private String currentServiceOperator;
    private String recipientServiceOperator;
    private String recipientNetworkOperator;
    private String currentNumberType;
    private String requestedExecutionDate;
    private String requestedExecutionTime;
    private String customerId;
    private String icc;
    private String pointOfConnection;
    private String regDate;
    private String modDate;
    private String userId;

    @ManyToOne
    @JoinColumn(name = "status_id")
    private StatusEntity status;

    //Constructors, Gettters, Setters
    public NumberEntity(){}
    public NumberEntity(String telephoneNumber,String ochOrderNumber, String uniqueId, String originatingOrderNumber, String currentServiceOperator, String recipientServiceOperator, String recipientNetworkOperator, String currentNumberType, String requestedExecutionDate, String requestedExecutionTime, String customerId, String icc, String pointOfConnection, String regDate, String modDate, StatusEntity status){
        this.telephoneNumber = telephoneNumber;
        this.ochOrderNumber = ochOrderNumber;
        this.uniqueId = uniqueId;
        this.originatingOrderNumber = originatingOrderNumber;
        this.currentServiceOperator = currentServiceOperator;
        this.recipientServiceOperator = recipientServiceOperator;
        this.recipientNetworkOperator = recipientNetworkOperator;
        this.currentNumberType = currentNumberType;
        this.requestedExecutionDate = requestedExecutionDate;
        this.requestedExecutionTime = requestedExecutionTime;
        this.customerId = customerId;
        this.icc = icc;
        this.pointOfConnection = pointOfConnection;
        this.regDate = regDate;
        this.modDate = modDate;
        this.status = status;
    }

    public Long getId(){return id;}
    public String getTelephoneNumber(){
        return telephoneNumber;
    }
    public void setTelephoneNumber(String telephoneNumber){
        this.telephoneNumber = telephoneNumber;
    }

    public String getOchOrderNumber(){
        return ochOrderNumber;
    }
    public void setOchOrderNumber(String ochOrderNumber){
        this.ochOrderNumber = ochOrderNumber;
    }

    public String getUniqueId(){
        return uniqueId;
    }
    public void setUniqueId(String uniqueId){
        this.uniqueId = uniqueId;
    }

    public String getOriginatingOrderNumber(){
        return originatingOrderNumber;
    }
    public void setOriginatingOrderNumber(String originatingOrderNumber){
        this.originatingOrderNumber = originatingOrderNumber;
    }

    public String getRecipientServiceOperator(){
        return recipientServiceOperator;
    }
    public void setRecipientServiceOperator(String recipientServiceOperator){
        this.recipientServiceOperator = recipientServiceOperator;
    }

    public String getRecipientNetworkOperator(){
        return recipientNetworkOperator;
    }
    public void setRecipientNetworkOperator(String recipientNetworkOperator){
        this.recipientNetworkOperator = recipientNetworkOperator;
    }

    public String getCurrentNumberType(){
        return currentNumberType;
    }
    public void setCurrentNumberType(String currentNumberType){
        this.currentNumberType = currentNumberType;
    }

    public String getRequestedExecutionDate(){
        return requestedExecutionDate;
    }
    public void setRequestedExecutionDate(String requestedExecutionDate){
        this.requestedExecutionDate = requestedExecutionDate;
    }

    public String getRequestedExecutionTime(){
        return requestedExecutionTime;
    }
    public void setRequestedExecutionTime(String requestedExecutionTime){
        this.requestedExecutionTime = requestedExecutionTime;
    }

    public String getCustomerId(){
        return customerId;
    }
    public void setCustomerId(String customerId){
        this.customerId = customerId;
    }

    public String getIcc(){
        return icc;
    }
    public void setIcc(String icc){
        this.icc = icc;
    }

    public String getPointOfConnection(){
        return pointOfConnection;
    }
    public void setPointOfConnection(String pointOfConnection){
        this.pointOfConnection = pointOfConnection;
    }

    public String getCurrentServiceOperator(){
        return currentServiceOperator;
    }
    public void setCurrentServiceOperator(String currentServiceOperator){
        this.currentServiceOperator = currentServiceOperator;
    }

    public String getRegdate(){
        return regDate;
    }
    public void setRegdate(String regDate){
        this.regDate = regDate;
    }

    public String getModdate(){
        return modDate;
    }
    public void setModdate(String modDate){
        this.modDate = modDate;
    }
    
    public StatusEntity getStatus(){
        return status;
    }
    public void setStatus(StatusEntity status){
        this.status = status;
    }

    public String getUserId(){
        return userId;
    }

    public void setUserId(String userId){
        this.userId = userId;
    }
}

