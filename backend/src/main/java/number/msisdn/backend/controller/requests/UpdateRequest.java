package number.msisdn.backend.controller.requests;

public class UpdateRequest {
     private String portationDate;
    private String registrationDate;
    private String portationStatus;

    // Getters and Setters
    public String getPortationDate() {
        return portationDate;
    }

    public void setPortationDate(String portationDate) {
        this.portationDate = portationDate;
    }

    public String getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(String registrationDate) {
        this.registrationDate = registrationDate;
    }

    public String getPortationStatus() {
        return portationStatus;
    }

    public void setPortationStatus(String portationStatus) {
        this.portationStatus = portationStatus;
    }
}
