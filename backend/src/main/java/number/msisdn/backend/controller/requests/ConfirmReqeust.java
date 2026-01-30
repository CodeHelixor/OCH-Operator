package number.msisdn.backend.controller.requests;

public class ConfirmReqeust {
    private String confirmedExecutionDate;
    private String confirmationStatus;

    public String getConfirmedExecutionDate(){
        return confirmedExecutionDate;
    }
    public void setConfirmedExecutionDate(String confirmedExecutionDate){
        this.confirmedExecutionDate = confirmedExecutionDate;
    }

    public String getConfirmationStatus(){
        return confirmationStatus;
    }
    public void setConfirmationStatus(String confirmationStatus){
        this.confirmationStatus = confirmationStatus;
    }
}
