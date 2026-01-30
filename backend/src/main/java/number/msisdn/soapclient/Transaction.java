
package number.msisdn.soapclient;

import java.util.ArrayList;
import java.util.List;
import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlType;


/**
 * <p>Java class for transaction complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>{@code
 * <complexType name="transaction">
 *   <complexContent>
 *     <restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       <sequence>
 *         <element name="chargingInfo" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         <element name="comments" type="{http://och.dk/server/services/ich}comment" maxOccurs="unbounded" minOccurs="0"/>
 *         <element name="confirmationStatus" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/>
 *         <element name="confirmedExecutionDate" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         <element name="confirmedExecutionTime" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         <element name="currentNetworkOperator" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         <element name="currentNumberType" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         <element name="currentRangeHolder" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         <element name="currentServiceOperator" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         <element name="customerCity" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         <element name="customerFirstName" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         <element name="customerFloor" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         <element name="customerHouseName" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         <element name="customerId" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         <element name="customerLastName" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         <element name="customerLocationName" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         <element name="customerPostalCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         <element name="customerRightLeftDoor" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         <element name="customerStairCase" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         <element name="customerStreetName" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         <element name="customerStreetNumber" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         <element name="directoryInfo" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/>
 *         <element name="errors" type="{http://och.dk/server/services/ich}error" maxOccurs="unbounded" minOccurs="0"/>
 *         <element name="icc" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         <element name="municipality" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         <element name="newNumberType" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         <element name="numberPorted" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         <element name="ochOrderNumber" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         <element name="originatingOrderNumber" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         <element name="otherOperator" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         <element name="pointOfConnection" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         <element name="portingCase" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         <element name="portingType" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         <element name="priority" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *         <element name="rangeEnd" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         <element name="rangeStart" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         <element name="rangeUpdateType" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         <element name="recipientNetworkOperator" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         <element name="recipientServiceOperator" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         <element name="rejects" type="{http://och.dk/server/services/ich}reject" maxOccurs="unbounded" minOccurs="0"/>
 *         <element name="requestedExecutionDate" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         <element name="requestedExecutionTime" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         <element name="routingInfo" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         <element name="series" type="{http://och.dk/server/services/ich}series" maxOccurs="unbounded" minOccurs="0"/>
 *         <element name="spc" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         <element name="telephoneNumber" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         <element name="transactionType" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         <element name="uniqueId" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       </sequence>
 *     </restriction>
 *   </complexContent>
 * </complexType>
 * }</pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "transaction", propOrder = {
    "chargingInfo",
    "comments",
    "confirmationStatus",
    "confirmedExecutionDate",
    "confirmedExecutionTime",
    "currentNetworkOperator",
    "currentNumberType",
    "currentRangeHolder",
    "currentServiceOperator",
    "customerCity",
    "customerFirstName",
    "customerFloor",
    "customerHouseName",
    "customerId",
    "customerLastName",
    "customerLocationName",
    "customerPostalCode",
    "customerRightLeftDoor",
    "customerStairCase",
    "customerStreetName",
    "customerStreetNumber",
    "directoryInfo",
    "errors",
    "icc",
    "municipality",
    "newNumberType",
    "numberPorted",
    "ochOrderNumber",
    "originatingOrderNumber",
    "otherOperator",
    "pointOfConnection",
    "portingCase",
    "portingType",
    "priority",
    "rangeEnd",
    "rangeStart",
    "rangeUpdateType",
    "recipientNetworkOperator",
    "recipientServiceOperator",
    "rejects",
    "requestedExecutionDate",
    "requestedExecutionTime",
    "routingInfo",
    "series",
    "spc",
    "telephoneNumber",
    "transactionType",
    "uniqueId"
})
public class Transaction {

    protected String chargingInfo;
    @XmlElement(nillable = true)
    protected List<Comment> comments;
    protected Integer confirmationStatus;
    protected String confirmedExecutionDate;
    protected String confirmedExecutionTime;
    protected String currentNetworkOperator;
    protected String currentNumberType;
    protected String currentRangeHolder;
    protected String currentServiceOperator;
    protected String customerCity;
    protected String customerFirstName;
    protected String customerFloor;
    protected String customerHouseName;
    protected String customerId;
    protected String customerLastName;
    protected String customerLocationName;
    protected String customerPostalCode;
    protected String customerRightLeftDoor;
    protected String customerStairCase;
    protected String customerStreetName;
    protected String customerStreetNumber;
    protected Integer directoryInfo;
    @XmlElement(nillable = true)
    protected List<Error> errors;
    protected String icc;
    protected String municipality;
    protected String newNumberType;
    protected String numberPorted;
    protected String ochOrderNumber;
    protected String originatingOrderNumber;
    protected String otherOperator;
    protected String pointOfConnection;
    protected String portingCase;
    protected String portingType;
    protected int priority;
    protected String rangeEnd;
    protected String rangeStart;
    protected String rangeUpdateType;
    protected String recipientNetworkOperator;
    protected String recipientServiceOperator;
    @XmlElement(nillable = true)
    protected List<Reject> rejects;
    protected String requestedExecutionDate;
    protected String requestedExecutionTime;
    protected String routingInfo;
    @XmlElement(nillable = true)
    protected List<Series> series;
    protected String spc;
    protected String telephoneNumber;
    protected String transactionType;
    protected String uniqueId;

    /**
     * Gets the value of the chargingInfo property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getChargingInfo() {
        return chargingInfo;
    }

    /**
     * Sets the value of the chargingInfo property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setChargingInfo(String value) {
        this.chargingInfo = value;
    }

    /**
     * Gets the value of the comments property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the Jakarta XML Binding object.
     * This is why there is not a {@code set} method for the comments property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getComments().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link Comment }
     * 
     * 
     * @return
     *     The value of the comments property.
     */
    public List<Comment> getComments() {
        if (comments == null) {
            comments = new ArrayList<>();
        }
        return this.comments;
    }

    /**
     * Gets the value of the confirmationStatus property.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getConfirmationStatus() {
        return confirmationStatus;
    }

    /**
     * Sets the value of the confirmationStatus property.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setConfirmationStatus(Integer value) {
        this.confirmationStatus = value;
    }

    /**
     * Gets the value of the confirmedExecutionDate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getConfirmedExecutionDate() {
        return confirmedExecutionDate;
    }

    /**
     * Sets the value of the confirmedExecutionDate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setConfirmedExecutionDate(String value) {
        this.confirmedExecutionDate = value;
    }

    /**
     * Gets the value of the confirmedExecutionTime property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getConfirmedExecutionTime() {
        return confirmedExecutionTime;
    }

    /**
     * Sets the value of the confirmedExecutionTime property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setConfirmedExecutionTime(String value) {
        this.confirmedExecutionTime = value;
    }

    /**
     * Gets the value of the currentNetworkOperator property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCurrentNetworkOperator() {
        return currentNetworkOperator;
    }

    /**
     * Sets the value of the currentNetworkOperator property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCurrentNetworkOperator(String value) {
        this.currentNetworkOperator = value;
    }

    /**
     * Gets the value of the currentNumberType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCurrentNumberType() {
        return currentNumberType;
    }

    /**
     * Sets the value of the currentNumberType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCurrentNumberType(String value) {
        this.currentNumberType = value;
    }

    /**
     * Gets the value of the currentRangeHolder property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCurrentRangeHolder() {
        return currentRangeHolder;
    }

    /**
     * Sets the value of the currentRangeHolder property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCurrentRangeHolder(String value) {
        this.currentRangeHolder = value;
    }

    /**
     * Gets the value of the currentServiceOperator property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCurrentServiceOperator() {
        return currentServiceOperator;
    }

    /**
     * Sets the value of the currentServiceOperator property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCurrentServiceOperator(String value) {
        this.currentServiceOperator = value;
    }

    /**
     * Gets the value of the customerCity property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCustomerCity() {
        return customerCity;
    }

    /**
     * Sets the value of the customerCity property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCustomerCity(String value) {
        this.customerCity = value;
    }

    /**
     * Gets the value of the customerFirstName property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCustomerFirstName() {
        return customerFirstName;
    }

    /**
     * Sets the value of the customerFirstName property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCustomerFirstName(String value) {
        this.customerFirstName = value;
    }

    /**
     * Gets the value of the customerFloor property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCustomerFloor() {
        return customerFloor;
    }

    /**
     * Sets the value of the customerFloor property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCustomerFloor(String value) {
        this.customerFloor = value;
    }

    /**
     * Gets the value of the customerHouseName property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCustomerHouseName() {
        return customerHouseName;
    }

    /**
     * Sets the value of the customerHouseName property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCustomerHouseName(String value) {
        this.customerHouseName = value;
    }

    /**
     * Gets the value of the customerId property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCustomerId() {
        return customerId;
    }

    /**
     * Sets the value of the customerId property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCustomerId(String value) {
        this.customerId = value;
    }

    /**
     * Gets the value of the customerLastName property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCustomerLastName() {
        return customerLastName;
    }

    /**
     * Sets the value of the customerLastName property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCustomerLastName(String value) {
        this.customerLastName = value;
    }

    /**
     * Gets the value of the customerLocationName property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCustomerLocationName() {
        return customerLocationName;
    }

    /**
     * Sets the value of the customerLocationName property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCustomerLocationName(String value) {
        this.customerLocationName = value;
    }

    /**
     * Gets the value of the customerPostalCode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCustomerPostalCode() {
        return customerPostalCode;
    }

    /**
     * Sets the value of the customerPostalCode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCustomerPostalCode(String value) {
        this.customerPostalCode = value;
    }

    /**
     * Gets the value of the customerRightLeftDoor property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCustomerRightLeftDoor() {
        return customerRightLeftDoor;
    }

    /**
     * Sets the value of the customerRightLeftDoor property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCustomerRightLeftDoor(String value) {
        this.customerRightLeftDoor = value;
    }

    /**
     * Gets the value of the customerStairCase property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCustomerStairCase() {
        return customerStairCase;
    }

    /**
     * Sets the value of the customerStairCase property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCustomerStairCase(String value) {
        this.customerStairCase = value;
    }

    /**
     * Gets the value of the customerStreetName property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCustomerStreetName() {
        return customerStreetName;
    }

    /**
     * Sets the value of the customerStreetName property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCustomerStreetName(String value) {
        this.customerStreetName = value;
    }

    /**
     * Gets the value of the customerStreetNumber property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCustomerStreetNumber() {
        return customerStreetNumber;
    }

    /**
     * Sets the value of the customerStreetNumber property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCustomerStreetNumber(String value) {
        this.customerStreetNumber = value;
    }

    /**
     * Gets the value of the directoryInfo property.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getDirectoryInfo() {
        return directoryInfo;
    }

    /**
     * Sets the value of the directoryInfo property.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setDirectoryInfo(Integer value) {
        this.directoryInfo = value;
    }

    /**
     * Gets the value of the errors property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the Jakarta XML Binding object.
     * This is why there is not a {@code set} method for the errors property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getErrors().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link Error }
     * 
     * 
     * @return
     *     The value of the errors property.
     */
    public List<Error> getErrors() {
        if (errors == null) {
            errors = new ArrayList<>();
        }
        return this.errors;
    }

    /**
     * Gets the value of the icc property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIcc() {
        return icc;
    }

    /**
     * Sets the value of the icc property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIcc(String value) {
        this.icc = value;
    }

    /**
     * Gets the value of the municipality property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMunicipality() {
        return municipality;
    }

    /**
     * Sets the value of the municipality property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMunicipality(String value) {
        this.municipality = value;
    }

    /**
     * Gets the value of the newNumberType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNewNumberType() {
        return newNumberType;
    }

    /**
     * Sets the value of the newNumberType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNewNumberType(String value) {
        this.newNumberType = value;
    }

    /**
     * Gets the value of the numberPorted property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNumberPorted() {
        return numberPorted;
    }

    /**
     * Sets the value of the numberPorted property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNumberPorted(String value) {
        this.numberPorted = value;
    }

    /**
     * Gets the value of the ochOrderNumber property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getOchOrderNumber() {
        return ochOrderNumber;
    }

    /**
     * Sets the value of the ochOrderNumber property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setOchOrderNumber(String value) {
        this.ochOrderNumber = value;
    }

    /**
     * Gets the value of the originatingOrderNumber property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getOriginatingOrderNumber() {
        return originatingOrderNumber;
    }

    /**
     * Sets the value of the originatingOrderNumber property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setOriginatingOrderNumber(String value) {
        this.originatingOrderNumber = value;
    }

    /**
     * Gets the value of the otherOperator property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getOtherOperator() {
        return otherOperator;
    }

    /**
     * Sets the value of the otherOperator property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setOtherOperator(String value) {
        this.otherOperator = value;
    }

    /**
     * Gets the value of the pointOfConnection property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPointOfConnection() {
        return pointOfConnection;
    }

    /**
     * Sets the value of the pointOfConnection property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPointOfConnection(String value) {
        this.pointOfConnection = value;
    }

    /**
     * Gets the value of the portingCase property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPortingCase() {
        return portingCase;
    }

    /**
     * Sets the value of the portingCase property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPortingCase(String value) {
        this.portingCase = value;
    }

    /**
     * Gets the value of the portingType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPortingType() {
        return portingType;
    }

    /**
     * Sets the value of the portingType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPortingType(String value) {
        this.portingType = value;
    }

    /**
     * Gets the value of the priority property.
     * 
     */
    public int getPriority() {
        return priority;
    }

    /**
     * Sets the value of the priority property.
     * 
     */
    public void setPriority(int value) {
        this.priority = value;
    }

    /**
     * Gets the value of the rangeEnd property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRangeEnd() {
        return rangeEnd;
    }

    /**
     * Sets the value of the rangeEnd property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRangeEnd(String value) {
        this.rangeEnd = value;
    }

    /**
     * Gets the value of the rangeStart property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRangeStart() {
        return rangeStart;
    }

    /**
     * Sets the value of the rangeStart property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRangeStart(String value) {
        this.rangeStart = value;
    }

    /**
     * Gets the value of the rangeUpdateType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRangeUpdateType() {
        return rangeUpdateType;
    }

    /**
     * Sets the value of the rangeUpdateType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRangeUpdateType(String value) {
        this.rangeUpdateType = value;
    }

    /**
     * Gets the value of the recipientNetworkOperator property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRecipientNetworkOperator() {
        return recipientNetworkOperator;
    }

    /**
     * Sets the value of the recipientNetworkOperator property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRecipientNetworkOperator(String value) {
        this.recipientNetworkOperator = value;
    }

    /**
     * Gets the value of the recipientServiceOperator property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRecipientServiceOperator() {
        return recipientServiceOperator;
    }

    /**
     * Sets the value of the recipientServiceOperator property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRecipientServiceOperator(String value) {
        this.recipientServiceOperator = value;
    }

    /**
     * Gets the value of the rejects property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the Jakarta XML Binding object.
     * This is why there is not a {@code set} method for the rejects property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getRejects().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link Reject }
     * 
     * 
     * @return
     *     The value of the rejects property.
     */
    public List<Reject> getRejects() {
        if (rejects == null) {
            rejects = new ArrayList<>();
        }
        return this.rejects;
    }

    /**
     * Gets the value of the requestedExecutionDate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRequestedExecutionDate() {
        return requestedExecutionDate;
    }

    /**
     * Sets the value of the requestedExecutionDate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRequestedExecutionDate(String value) {
        this.requestedExecutionDate = value;
    }

    /**
     * Gets the value of the requestedExecutionTime property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRequestedExecutionTime() {
        return requestedExecutionTime;
    }

    /**
     * Sets the value of the requestedExecutionTime property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRequestedExecutionTime(String value) {
        this.requestedExecutionTime = value;
    }

    /**
     * Gets the value of the routingInfo property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRoutingInfo() {
        return routingInfo;
    }

    /**
     * Sets the value of the routingInfo property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRoutingInfo(String value) {
        this.routingInfo = value;
    }

    /**
     * Gets the value of the series property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the Jakarta XML Binding object.
     * This is why there is not a {@code set} method for the series property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getSeries().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link Series }
     * 
     * 
     * @return
     *     The value of the series property.
     */
    public List<Series> getSeries() {
        if (series == null) {
            series = new ArrayList<>();
        }
        return this.series;
    }

    /**
     * Gets the value of the spc property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSpc() {
        return spc;
    }

    /**
     * Sets the value of the spc property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSpc(String value) {
        this.spc = value;
    }

    /**
     * Gets the value of the telephoneNumber property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTelephoneNumber() {
        return telephoneNumber;
    }

    /**
     * Sets the value of the telephoneNumber property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTelephoneNumber(String value) {
        this.telephoneNumber = value;
    }

    /**
     * Gets the value of the transactionType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTransactionType() {
        return transactionType;
    }

    /**
     * Sets the value of the transactionType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTransactionType(String value) {
        this.transactionType = value;
    }

    /**
     * Gets the value of the uniqueId property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getUniqueId() {
        return uniqueId;
    }

    /**
     * Sets the value of the uniqueId property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setUniqueId(String value) {
        this.uniqueId = value;
    }

}
