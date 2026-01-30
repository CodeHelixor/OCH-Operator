package number.msisdn.backend.database.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ErrorDetail {
    private String code;
    private String text;
    private String field;

    public ErrorDetail() {}

    public ErrorDetail(String code, String text, String field) {
        this.code = code;
        this.text = text;
        this.field = field;
    }

    // Getters and setters
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public String getField() { return field; }
    public void setField(String field) { this.field = field; }
}
