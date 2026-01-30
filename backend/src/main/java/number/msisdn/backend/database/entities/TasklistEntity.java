package number.msisdn.backend.database.entities;

import jakarta.persistence.*;

@Entity
@Table(name="tasklisttable")
public class TasklistEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String transactionType;
    private String telephoneNumber;
    private String ochOrderNumber;
    private String uniqueId;
    private String originatingOrderNumber;
    private String currentServiceOperator;
    private String currentNetworkOperator;
    private String recipientServiceOperator;
    private String recipientNetworkOperator;
    private String currentNumberType;
    private String requestedExecutionDate;
    private String pointOfConnection;
    private String confirmedExecutionDate;
    private boolean isCompleted;
    @ManyToOne
    @JoinColumn(name = "confirmstatus_id")
    private ConfirmationStatusEntity confirmationStatus;
    
    public TasklistEntity(){}
    public TasklistEntity(String transactionType, 
                          String telephoneNumber, 
                          String ochOrderNumber, 
                          String uniqueId, 
                          String originatingOrderNumber, 
                          String currentServiceOperator, 
                          String currentNetworkOperator,
                          String recipientServiceOperator, 
                          String recipientNetworkOperator, 
                          String currentNumberType, 
                          String requestedExecutionDate, 
                          String pointOfConnection,
                          String confirmedExecutionDate, 
                          boolean isCompleted, 
                          ConfirmationStatusEntity confirmationStatus){
        this.transactionType = transactionType;
        this.telephoneNumber = telephoneNumber;
        this.ochOrderNumber = ochOrderNumber;
        this.uniqueId = uniqueId;
        this.originatingOrderNumber = originatingOrderNumber;
        this.currentServiceOperator = currentServiceOperator;
        this.currentNetworkOperator = currentNetworkOperator;
        this.recipientServiceOperator = recipientServiceOperator;
        this.recipientNetworkOperator = recipientNetworkOperator;
        this.currentNumberType = currentNumberType;
        this.requestedExecutionDate = requestedExecutionDate;
        this.pointOfConnection = pointOfConnection;
        this.confirmedExecutionDate = confirmedExecutionDate;
        this.isCompleted = isCompleted;
        this.confirmationStatus = confirmationStatus;
    }

    public Long getId(){return id;}
    
    public String getTransactionType(){
        return transactionType;
    }

    public void setTransactionType(String transactionType){
        this.transactionType = transactionType;
    }

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

    public String getCurrentNetworkOperator(){
        return currentNetworkOperator;
    }

    public void setCurrentNetworkOperator(String currentNetworkOperator){
        this.currentNetworkOperator = currentNetworkOperator;
    }

    public String getCurrentServiceOperator(){
        return currentServiceOperator;
    }

    public void setCurrentServiceOperator(String currentServiceOperator){
        this.currentServiceOperator = currentServiceOperator;
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

    public String getPointOfConnection(){
        return pointOfConnection;
    }

    public void setPointOfConnection(String pointOfConnection){
        this.pointOfConnection = pointOfConnection;
    }

    public String getConfirmedExecutionDate(){
        return confirmedExecutionDate;
    }

    public void setConfirmedExecutionDate(String confirmedExecutionDate){
        this.confirmedExecutionDate = confirmedExecutionDate;
    }

    public boolean getIsCompleted(){
        return isCompleted;
    }

    public void setIsCompleted(boolean isCompleted){
        this.isCompleted = isCompleted;
    }

    public ConfirmationStatusEntity getConfirmationStatus(){
        return confirmationStatus;
    }
    public void setConfirmationStatus(ConfirmationStatusEntity confirmationStatus){
        this.confirmationStatus = confirmationStatus;
    }
}
