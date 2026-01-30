package number.msisdn.backend.controller.requests;

public class CancelRequest {
    private String telephoneNumber;
    private String ochOrderNumber;
    private String uniqueId;
    private String originatingOrderNumber;

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
}
