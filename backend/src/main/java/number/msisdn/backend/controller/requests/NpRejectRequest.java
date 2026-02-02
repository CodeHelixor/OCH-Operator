package number.msisdn.backend.controller.requests;

/**
 * Request for NP Reject transaction (TransactionType 006) to OCH.
 * See OCH document: reject an NP Create by sending NP Reject with RejectCode and RejectText.
 */
public class NpRejectRequest {
    /** TransactionType for NP Reject. Must be "006" when sending to OCH. */
    private String transactionType = "006";
    private String telephoneNumber;
    private String ochOrderNumber;
    private String uniqueId;
    private String originatingOrderNumber;
    /** Other operator (OCH otherOperator); from DB recipient_service_operator. */
    private String otherOperator;
    /** Reject code (e.g. 382). */
    private int rejectCode;
    /** Reject reason text. */
    private String rejectText;

    public String getTransactionType() {
        return transactionType != null ? transactionType : "006";
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    public String getTelephoneNumber() {
        return telephoneNumber;
    }

    public void setTelephoneNumber(String telephoneNumber) {
        this.telephoneNumber = telephoneNumber;
    }

    public String getOchOrderNumber() {
        return ochOrderNumber;
    }

    public void setOchOrderNumber(String ochOrderNumber) {
        this.ochOrderNumber = ochOrderNumber;
    }

    public String getUniqueId() {
        return uniqueId;
    }

    public void setUniqueId(String uniqueId) {
        this.uniqueId = uniqueId;
    }

    public String getOriginatingOrderNumber() {
        return originatingOrderNumber;
    }

    public void setOriginatingOrderNumber(String originatingOrderNumber) {
        this.originatingOrderNumber = originatingOrderNumber;
    }

    public String getOtherOperator() {
        return otherOperator;
    }

    public void setOtherOperator(String otherOperator) {
        this.otherOperator = otherOperator;
    }

    public int getRejectCode() {
        return rejectCode;
    }

    public void setRejectCode(int rejectCode) {
        this.rejectCode = rejectCode;
    }

    public String getRejectText() {
        return rejectText;
    }

    public void setRejectText(String rejectText) {
        this.rejectText = rejectText;
    }
}
