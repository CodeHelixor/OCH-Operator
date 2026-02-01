package number.msisdn.backend.database.entities;

import jakarta.persistence.*;

@Entity
@Table(name="rangetable")
public class RangeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ochOrderNumber;
    private String uniqueId;
    private String originatingOrderNumber;
    private String rangeUpdateType;
    private String rangeStart;
    private String rangeEnd;
    private String otherOperator;
    private String currentRangeHolder;
    @Column(name = "currentServiceOperator")
    private String recipientServiceOperator;
    private String currentNetworkOperator;
    private String portingCase;
    private String spc;
    private String municipality;
    private String routingInfo;
    private String chargingInfo;
    private String newNumberType;
    private boolean isCompleted;
    private String createdAt;
    private String userId;

    public RangeEntity(){}
    public RangeEntity(String ochOrderNumber, String uniqueId, String originatingOrderNumber, String rangeUpdateType, String rangeStart, String rangeEnd, String otherOperator, String currentRangeHolder, String recipientServiceOperator, String currentNetworkOperator, String portingCase, String spc, String municipality, String routingInfo, String chargingInfo, String newNumberType, String createdAt, boolean isCompleted){
        this.ochOrderNumber = ochOrderNumber;
        this.uniqueId = uniqueId;
        this.originatingOrderNumber = originatingOrderNumber;
        this.rangeUpdateType = rangeUpdateType;
        this.rangeStart = rangeStart;
        this.rangeEnd = rangeEnd;
        this.otherOperator = otherOperator;
        this.currentRangeHolder = currentRangeHolder;
        this.currentNetworkOperator = currentNetworkOperator;
        this.recipientServiceOperator = recipientServiceOperator;
        this.portingCase = portingCase;
        this.spc=spc;
        this.municipality = municipality;
        this.routingInfo = routingInfo;
        this.chargingInfo = chargingInfo;
        this.newNumberType=newNumberType;
        this.createdAt = createdAt;
        this.isCompleted =  isCompleted;
    }

    public Long getId(){return id;}

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

    public String getRangeUpdateType(){
        return this.rangeUpdateType;
    }
    public void setRangeUpdateType(String rangeUpdateType){
        this.rangeUpdateType = rangeUpdateType;
    }

    public String getRangeStart(){
        return this.rangeStart;
    }
    public void setRangeStart(String rangeStart){
        this.rangeStart = rangeStart;
    }

    public String getRangeEnd(){
        return this.rangeEnd;
    }
    public void setRangeEnd(String rangeEnd){
        this.rangeEnd = rangeEnd;
    }

    public String getOtherOperator(){
        return this.otherOperator;
    }
    public void setOtherOperator(String otherOperator){
        this.otherOperator = otherOperator;
    }

    public String getCurrentRangeHolder(){
        return this.currentRangeHolder;
    }
    public void setCurrentRangeHolder(String currentRangeHolder){
        this.currentRangeHolder = currentRangeHolder;
    }

    public String getRecipientServiceOperator(){
        return this.recipientServiceOperator;
    }
    public void setRecipientServiceOperator(String recipientServiceOperator){
        this.recipientServiceOperator = recipientServiceOperator;
    }

    public String getCurrentNetworkOperator(){
        return this.currentNetworkOperator;
    }
    public void setCurrentNetworkOperator(String currentNetworkOperator){
        this.currentNetworkOperator = currentNetworkOperator;
    }

    public String getPortingCase(){
        return this.portingCase;
    }
    public void setPortingCase(String portingCase){
        this.portingCase = portingCase;
    }

    public String getSpc(){
        return this.spc;
    }
    public void setSpc(String spc){
        this.spc = spc;
    }

    public String getMunicipality(){
        return this.municipality;
    }
    public void setMunicipality(String municipality){
        this.municipality = municipality;
    }

    public String getRoutingInfo(){
        return this.routingInfo;
    }
    public void setRoutingInfo(String routingInfo){
        this.routingInfo = routingInfo;
    }

    public String getChargingInfo(){
        return this.chargingInfo;
    }
    public void setChargingInfo(String chargingInfo){
        this.chargingInfo = chargingInfo;
    }

    public String getNewNumberType(){
        return this.newNumberType;
    }
    public void setNewNumberType(String newNumberType){
        this.newNumberType = newNumberType;
    }

    public boolean getIsCompleted(){
        return this.isCompleted;
    }
    public void setIsCompleted(boolean isCompleted){
        this.isCompleted = isCompleted;
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
}

