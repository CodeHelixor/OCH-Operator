package number.msisdn.backend.controller.responses;

public class CreateResponse {
    private boolean success;
    private String error;

      public CreateResponse() {}

    public CreateResponse(boolean success, String error) {
        this.success = success;
        this.error = error;
    }

    // Getters and setters
    public boolean getSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
