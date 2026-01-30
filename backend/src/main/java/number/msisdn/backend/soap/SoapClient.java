package number.msisdn.backend.soap;

import org.springframework.stereotype.Service;

import jakarta.xml.ws.BindingProvider;
import number.msisdn.backend.general.AuthStore;
import number.msisdn.soapclient.Transport;
import number.msisdn.soapclient.TransportService;

@Service
public class SoapClient {
    public Transport port;

    public Transport getPort(){
        TransportService service = new TransportService();
        port = service.getTransportPort();

        // Set HTTP Basic Authentication credentials
        BindingProvider bindingProvider = (BindingProvider) port;
        bindingProvider.getRequestContext().put(BindingProvider.USERNAME_PROPERTY, AuthStore.getUsername());
        bindingProvider.getRequestContext().put(BindingProvider.PASSWORD_PROPERTY, AuthStore.getPassword());
        bindingProvider.getRequestContext().put(
                BindingProvider.ENDPOINT_ADDRESS_PROPERTY,
                "https://test02services.och.dk/v1/Transport"
        );
        return port;
    }
}

