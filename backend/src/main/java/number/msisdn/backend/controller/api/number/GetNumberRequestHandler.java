package number.msisdn.backend.controller.api.number;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import number.msisdn.backend.database.entities.NumberEntity;
import number.msisdn.backend.database.repositories.NumberRepository;
import number.msisdn.backend.general.FileUtility;

@Service
public class GetNumberRequestHandler {
    private final NumberRepository numberRepository;

    public GetNumberRequestHandler(NumberRepository numberRepository) {
        this.numberRepository = numberRepository;
    }

    /**
     * Returns numbers for the operator, deduplicated by telephone number.
     * When duplicates exist, keeps the most recent record (highest id).
     */
    public List<NumberEntity> handle() {
        try {
            String operator = FileUtility.readOperator();
            List<NumberEntity> allNumbers = numberRepository.findByRecipientOperatorOrderByIdDesc(operator);
            // Deduplicate by telephoneNumber: keep first occurrence (already sorted by id DESC = most recent first)
            Map<String, NumberEntity> uniqueByPhone = new LinkedHashMap<>();
            for (NumberEntity n : allNumbers) {
                String phone = n.getTelephoneNumber();
                if (phone != null && !uniqueByPhone.containsKey(phone)) {
                    uniqueByPhone.put(phone, n);
                }
            }
            return uniqueByPhone.values().stream().collect(Collectors.toList());
        } catch (Exception e) {
            return Collections.emptyList();
        }
    }
}
