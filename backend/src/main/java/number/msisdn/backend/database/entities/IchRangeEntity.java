package number.msisdn.backend.database.entities;

import jakarta.persistence.*;

@Entity
@Table(name="ichrangetable")
public class IchRangeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String rangeStart;
    private String rangeEnd;
    private String startDate;
    private String rangeHolderId;
    private String serviceOperator;
    private String networkOperator;
    private String lubo;
    private String numberType;
    private String spc;
    private String municipality;
    private String chargingInfo;
    private String routingInfo;
    private String portingCase;
    private String ochOrderNumber;
    private String endDate;

    public IchRangeEntity(){}
    public IchRangeEntity(String rangeStart, String rangeEnd, String startDate, String rangeHolderId, String serviceOperator, String networkOperator, String lubo,String numberType, String spc, String municipality, String chargingInfo, String routingInfo, String portingCase, String ochOrderNumber, String endDate){
        this.rangeStart = rangeStart;
        this.rangeEnd = rangeEnd;
        this.startDate = startDate;
        this.rangeHolderId = rangeHolderId;
        this.serviceOperator = serviceOperator;
        this.networkOperator = networkOperator;
        this.lubo = lubo;
        this.numberType = numberType;
        this.spc = spc;
        this.municipality = municipality;
        this.chargingInfo = chargingInfo;
        this.routingInfo = routingInfo;
        this.portingCase = portingCase;
        this.ochOrderNumber = ochOrderNumber;
        this.endDate = endDate;
    }

    public Long getId(){return id;}

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

    public String getStartDate(){
        return this.startDate;
    }
    public void setStartDate(String startDate){
        this.startDate = startDate;
    }

    public String getRangeHolderId(){
        return this.rangeHolderId;
    }
    public void setRangeHolderId(String rangeHolderId){
        this.rangeHolderId = rangeHolderId;
    }

    public String getServiceOperator(){
        return this.serviceOperator;
    }
    public void setServiceOperator(String serviceOperator){
        this.serviceOperator = serviceOperator;
    }

    public String getNetworkOperator(){
        return this.networkOperator;
    }
    public void setNetworkOperator(String networkOperator){
        this.networkOperator = networkOperator;
    }

    public String getLubo(){
        return this.lubo;
    }
    public void setLubo(String lubo){
        this.lubo = lubo;
    }

    public String getNumberType(){
        return this.numberType;
    }
    public void setNumberType(String numberType){
        this.numberType = numberType;
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

    public String getChargingInfo(){
        return this.chargingInfo;
    }
    public void setChargingInfo(String chargingInfo){
        this.chargingInfo = chargingInfo;
    }

    public String getRoutingInfo(){
        return this.routingInfo;
    }
    public void setRoutingInfo(String routingInfo){
        this.routingInfo = routingInfo;
    }

    public String getPortingCase(){
        return this.portingCase;
    }
    public void setPortingCase(String portingCase){
        this.portingCase = portingCase;
    }

    public String getOchOrderNumber(){
        return this.ochOrderNumber;
    }
    public void setOchOrderNumber(String ochOrderNumber){
        this.ochOrderNumber = ochOrderNumber;
    }

    public String getEndDate(){
        return this.endDate;
    }
    public void setEndDate(String endDate){
        this.endDate = endDate;
    }
}

