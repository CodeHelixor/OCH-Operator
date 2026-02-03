package number.msisdn.backend.controller.api.number;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import number.msisdn.backend.database.entities.NumberEntity;
import number.msisdn.backend.database.repositories.NumberRepository;

@Service
public class GetNumberRequestHandler {
    private final NumberRepository numberRepository;

    public GetNumberRequestHandler(NumberRepository numberRepository) {
        this.numberRepository = numberRepository;
    }

    /**
     * Returns all numbers, deduplicated by telephone number.
     * Display does not filter by recipient; when duplicates exist, keeps the most recent record (highest id).
     */
    public List<NumberEntity> handle() {
        try {
            List<NumberEntity> allNumbers = numberRepository.findAllByOrderByIdDesc();
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
