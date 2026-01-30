package number.msisdn.backend.controller.requests;

public class RangeRequest {
    private String rangeStart;
    private String rangeEnd;
    private String rangeUpdateType; 
    private String portingCase; 
    private String otherOperator; 
    private String currentRangeHolder; 
    private String currentNetworkOperator; 
    private String currentServiceOperator; 
    private String spc; 
    private String municipality;
    private String routingInfo;
    private String chargingInfo;
    private String newNumberType; 
    private String userId;

    public String getRangeStart(){
        return rangeStart;
    }
    public void setRangeStart(String rangeStart){
        this.rangeStart = rangeStart;
    }

    public String getRangeEnd(){
        return rangeEnd;
    }
    public void setRangeEnd(String rangeEnd){
        this.rangeEnd = rangeEnd;
    }

    public String getRangeUpdateType(){
        return rangeUpdateType;
    }
    public void setRangeUpdateType(String rangeUpdateType){
        this.rangeUpdateType = rangeUpdateType;
    }

    public String getPortingCase(){
        return portingCase;
    }
    public void setPortingCase(String portingCase){
        this.portingCase = portingCase;
    }

    public String getOtherOperator(){
        return otherOperator;
    }
    public void setOtherOperator(String otherOperator){
        this.otherOperator = otherOperator;
    }

    public String getCurrentRangeHolder(){
        return currentRangeHolder;
    }
    public void setCurrentRangeHolder(String currentRangeHolder){
        this.currentRangeHolder = currentRangeHolder;
    }

    public String getCurrentNetworkOperator(){
        return currentNetworkOperator;
    }
    public void setCurrentNetworkOperator(String currentNetworkOperator){
        this.currentNetworkOperator = currentNetworkOperator;
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

    public String getCurrentServiceOperator(){
        return currentServiceOperator;
    }
    public void setCurrentServiceOperator(String currentServiceOperator){
        this.currentServiceOperator = currentServiceOperator;
    }

    public String getNewNumberType(){
        return newNumberType;
    }
    public void setNewNumberType(String newNumberType){
        this.newNumberType = newNumberType;
    }

    public String getUserId(){
        return userId;
    }
    public void setUserId(String userId){
        this.userId = userId;
    }
}
