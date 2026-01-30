
package number.msisdn.soapclient;

import javax.xml.namespace.QName;
import jakarta.xml.bind.JAXBElement;
import jakarta.xml.bind.annotation.XmlElementDecl;
import jakarta.xml.bind.annotation.XmlRegistry;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the number.msisdn.soapclient package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {

    private final static QName _UnavailableException_QNAME = new QName("http://och.dk/server/services/ich", "UnavailableException");
    private final static QName _UserException_QNAME = new QName("http://och.dk/server/services/ich", "UserException");
    private final static QName _Confirm_QNAME = new QName("http://och.dk/server/services/ich", "confirm");
    private final static QName _ConfirmResponse_QNAME = new QName("http://och.dk/server/services/ich", "confirmResponse");
    private final static QName _Receive_QNAME = new QName("http://och.dk/server/services/ich", "receive");
    private final static QName _ReceiveResponse_QNAME = new QName("http://och.dk/server/services/ich", "receiveResponse");
    private final static QName _Send_QNAME = new QName("http://och.dk/server/services/ich", "send");
    private final static QName _SendResponse_QNAME = new QName("http://och.dk/server/services/ich", "sendResponse");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: number.msisdn.soapclient
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link UnavailableException }
     * 
     * @return
     *     the new instance of {@link UnavailableException }
     */
    public UnavailableException createUnavailableException() {
        return new UnavailableException();
    }

    /**
     * Create an instance of {@link UserException }
     * 
     * @return
     *     the new instance of {@link UserException }
     */
    public UserException createUserException() {
        return new UserException();
    }

    /**
     * Create an instance of {@link Confirm }
     * 
     * @return
     *     the new instance of {@link Confirm }
     */
    public Confirm createConfirm() {
        return new Confirm();
    }

    /**
     * Create an instance of {@link ConfirmResponse }
     * 
     * @return
     *     the new instance of {@link ConfirmResponse }
     */
    public ConfirmResponse createConfirmResponse() {
        return new ConfirmResponse();
    }

    /**
     * Create an instance of {@link Receive }
     * 
     * @return
     *     the new instance of {@link Receive }
     */
    public Receive createReceive() {
        return new Receive();
    }

    /**
     * Create an instance of {@link ReceiveResponse }
     * 
     * @return
     *     the new instance of {@link ReceiveResponse }
     */
    public ReceiveResponse createReceiveResponse() {
        return new ReceiveResponse();
    }

    /**
     * Create an instance of {@link Send }
     * 
     * @return
     *     the new instance of {@link Send }
     */
    public Send createSend() {
        return new Send();
    }

    /**
     * Create an instance of {@link SendResponse }
     * 
     * @return
     *     the new instance of {@link SendResponse }
     */
    public SendResponse createSendResponse() {
        return new SendResponse();
    }

    /**
     * Create an instance of {@link Batch }
     * 
     * @return
     *     the new instance of {@link Batch }
     */
    public Batch createBatch() {
        return new Batch();
    }

    /**
     * Create an instance of {@link Transaction }
     * 
     * @return
     *     the new instance of {@link Transaction }
     */
    public Transaction createTransaction() {
        return new Transaction();
    }

    /**
     * Create an instance of {@link Comment }
     * 
     * @return
     *     the new instance of {@link Comment }
     */
    public Comment createComment() {
        return new Comment();
    }

    /**
     * Create an instance of {@link Error }
     * 
     * @return
     *     the new instance of {@link Error }
     */
    public Error createError() {
        return new Error();
    }

    /**
     * Create an instance of {@link Reject }
     * 
     * @return
     *     the new instance of {@link Reject }
     */
    public Reject createReject() {
        return new Reject();
    }

    /**
     * Create an instance of {@link Series }
     * 
     * @return
     *     the new instance of {@link Series }
     */
    public Series createSeries() {
        return new Series();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link UnavailableException }{@code >}
     * 
     * @param value
     *     Java instance representing xml element's value.
     * @return
     *     the new instance of {@link JAXBElement }{@code <}{@link UnavailableException }{@code >}
     */
    @XmlElementDecl(namespace = "http://och.dk/server/services/ich", name = "UnavailableException")
    public JAXBElement<UnavailableException> createUnavailableException(UnavailableException value) {
        return new JAXBElement<>(_UnavailableException_QNAME, UnavailableException.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link UserException }{@code >}
     * 
     * @param value
     *     Java instance representing xml element's value.
     * @return
     *     the new instance of {@link JAXBElement }{@code <}{@link UserException }{@code >}
     */
    @XmlElementDecl(namespace = "http://och.dk/server/services/ich", name = "UserException")
    public JAXBElement<UserException> createUserException(UserException value) {
        return new JAXBElement<>(_UserException_QNAME, UserException.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Confirm }{@code >}
     * 
     * @param value
     *     Java instance representing xml element's value.
     * @return
     *     the new instance of {@link JAXBElement }{@code <}{@link Confirm }{@code >}
     */
    @XmlElementDecl(namespace = "http://och.dk/server/services/ich", name = "confirm")
    public JAXBElement<Confirm> createConfirm(Confirm value) {
        return new JAXBElement<>(_Confirm_QNAME, Confirm.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link ConfirmResponse }{@code >}
     * 
     * @param value
     *     Java instance representing xml element's value.
     * @return
     *     the new instance of {@link JAXBElement }{@code <}{@link ConfirmResponse }{@code >}
     */
    @XmlElementDecl(namespace = "http://och.dk/server/services/ich", name = "confirmResponse")
    public JAXBElement<ConfirmResponse> createConfirmResponse(ConfirmResponse value) {
        return new JAXBElement<>(_ConfirmResponse_QNAME, ConfirmResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Receive }{@code >}
     * 
     * @param value
     *     Java instance representing xml element's value.
     * @return
     *     the new instance of {@link JAXBElement }{@code <}{@link Receive }{@code >}
     */
    @XmlElementDecl(namespace = "http://och.dk/server/services/ich", name = "receive")
    public JAXBElement<Receive> createReceive(Receive value) {
        return new JAXBElement<>(_Receive_QNAME, Receive.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link ReceiveResponse }{@code >}
     * 
     * @param value
     *     Java instance representing xml element's value.
     * @return
     *     the new instance of {@link JAXBElement }{@code <}{@link ReceiveResponse }{@code >}
     */
    @XmlElementDecl(namespace = "http://och.dk/server/services/ich", name = "receiveResponse")
    public JAXBElement<ReceiveResponse> createReceiveResponse(ReceiveResponse value) {
        return new JAXBElement<>(_ReceiveResponse_QNAME, ReceiveResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Send }{@code >}
     * 
     * @param value
     *     Java instance representing xml element's value.
     * @return
     *     the new instance of {@link JAXBElement }{@code <}{@link Send }{@code >}
     */
    @XmlElementDecl(namespace = "http://och.dk/server/services/ich", name = "send")
    public JAXBElement<Send> createSend(Send value) {
        return new JAXBElement<>(_Send_QNAME, Send.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link SendResponse }{@code >}
     * 
     * @param value
     *     Java instance representing xml element's value.
     * @return
     *     the new instance of {@link JAXBElement }{@code <}{@link SendResponse }{@code >}
     */
    @XmlElementDecl(namespace = "http://och.dk/server/services/ich", name = "sendResponse")
    public JAXBElement<SendResponse> createSendResponse(SendResponse value) {
        return new JAXBElement<>(_SendResponse_QNAME, SendResponse.class, null, value);
    }

}
