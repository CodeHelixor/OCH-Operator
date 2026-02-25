package number.msisdn.backend.controller.requests;

public class CompleteRequest {
    private String telephoneNumber;
    private String ochOrderNumber;
    private String uniqueId;
    private String originatingOrderNumber;
    private String recipientServiceOperator;
    private String recipientNetworkOperator;
    private String portingCase;
    private String spc;
    private String municipality;
    private String routingInfo;
    private String chargingInfo;
    private String newNumberType;
    private String numberPorted;
    /** "Have you ever created a NP creation with this phone number?" - when true, UniqueId is decremented by 1 if operators differ */
    private Boolean hadNpCreationWithThisPhoneNumber;

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

    public String getPortingCase(){
        return portingCase;
    }
    public void setPortingCase(String portingCase){
        this.portingCase = portingCase;
    }

    public String getSpc(){
        return spc;
    }
    public void setSpc(String spc){
        this.spc = spc;
    }

    public String getMunicipality(){
        return municipality;
    }
    public void setMunicipality(String municipality){
        this.municipality = municipality;
    }

    public String getRoutingInfo(){
        return routingInfo;
    }
    public void setRoutingInfo(String routingInfo){
        this.routingInfo = routingInfo;
    }

    public String getChargingInfo(){
        return chargingInfo;
    }
    public void setChargingInfo(String chargingInfo){
        this.chargingInfo = chargingInfo;
    }

    public String getNewNumberType(){
        return newNumberType;
    }
    public void setNewNumberType(String newNumberType){
        this.newNumberType = newNumberType;
    }

    public String getNumberPorted(){
        return numberPorted;
    }
    public void setNumberPorted(String numberPorted){
        this.numberPorted = numberPorted;
    }

    public Boolean getHadNpCreationWithThisPhoneNumber(){
        return hadNpCreationWithThisPhoneNumber;
    }
    public void setHadNpCreationWithThisPhoneNumber(Boolean hadNpCreationWithThisPhoneNumber){
        this.hadNpCreationWithThisPhoneNumber = hadNpCreationWithThisPhoneNumber;
    }
}
