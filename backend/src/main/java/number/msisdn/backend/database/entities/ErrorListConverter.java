package number.msisdn.backend.database.entities;

import number.msisdn.soapclient.Error;
import jakarta.persistence.AttributeConverter;
import java.util.List;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;

public class ErrorListConverter implements AttributeConverter <List<Error>, String> {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(List<Error> attribute) {
        try {
            // System.out.println(objectMapper.writeValueAsString(attribute));
            return objectMapper.writeValueAsString(attribute);
        } catch (Exception e) {
            throw new IllegalArgumentException("Error converting List<ErrorDetail> to JSON", e);
        }
    }

    @Override
    public List<Error> convertToEntityAttribute(String dbData) {
        try {
            return objectMapper.readValue(dbData, new TypeReference<List<Error>>() {});
        } catch (Exception e) {
            throw new IllegalArgumentException("Error converting JSON to List<ErrorDetail>", e);
        }
    }
    
}
