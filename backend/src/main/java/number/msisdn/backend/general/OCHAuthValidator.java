package number.msisdn.backend.general;
import org.springframework.stereotype.Component;

import jakarta.xml.ws.BindingProvider;
import number.msisdn.soapclient.Transport;
import number.msisdn.soapclient.TransportService;
import number.msisdn.soapclient.UnavailableException_Exception;
import number.msisdn.soapclient.UserException_Exception;

@Component
public class OCHAuthValidator {

    public boolean validate(String username, String password) {
        try {
            // Create the SOAP service and port
            TransportService service = new TransportService();
            Transport port = service.getTransportPort();

            // Set HTTP Basic Authentication credentials
            BindingProvider bindingProvider = (BindingProvider) port;
            bindingProvider.getRequestContext().put(BindingProvider.USERNAME_PROPERTY, username);
            bindingProvider.getRequestContext().put(BindingProvider.PASSWORD_PROPERTY, password);
            bindingProvider.getRequestContext().put(
                    BindingProvider.ENDPOINT_ADDRESS_PROPERTY,
                    "https://test02services.och.dk/v1/Transport"
            );

            // Dummy request to trigger authentication
            long dummyBatchId = -1L;

            // If credentials are valid, server returns 200 OK even if batch doesn't exist
            port.receive(dummyBatchId);

            return true;

        } catch (UserException_Exception | UnavailableException_Exception e) {
            // These mean the user is authenticated, but the operation failed
            return true;
        } catch (jakarta.xml.ws.soap.SOAPFaultException e) {
            // If it's a SOAP-level fault (like invalid batch ID), consider it success
            return true;
        } catch (Exception e) {
            // All other exceptions (403, network errors, etc.)
            e.printStackTrace();
            return false;
        }
    }
}