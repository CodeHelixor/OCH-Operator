
package number.msisdn.soapclient;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlType;


/**
 * <p>Java class for receive complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>{@code
 * <complexType name="receive">
 *   <complexContent>
 *     <restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       <sequence>
 *         <element name="confirmBatchId" type="{http://www.w3.org/2001/XMLSchema}long"/>
 *       </sequence>
 *     </restriction>
 *   </complexContent>
 * </complexType>
 * }</pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "receive", propOrder = {
    "confirmBatchId"
})
public class Receive {

    protected long confirmBatchId;

    /**
     * Gets the value of the confirmBatchId property.
     * 
     */
    public long getConfirmBatchId() {
        return confirmBatchId;
    }

    /**
     * Sets the value of the confirmBatchId property.
     * 
     */
    public void setConfirmBatchId(long value) {
        this.confirmBatchId = value;
    }

}
