package number.msisdn.backend.controller.requests;

public class CreateRequest {
    private String telephoneNumber;
    private String recipientServiceOperator;
    private String recipientNetworkOperator;
    private String requestedExecutionDate;
    private String pointOfConnection;
    private String userId;

    public String getTelephoneNumber(){
        return telephoneNumber;
    }
    public void setTelephoneNumber(String telephoneNumber){
        this.telephoneNumber = telephoneNumber;
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

    public String getUserId(){
        return userId;
    }

    public void setUserId(String userId){
        this.userId = userId;
    }
}
