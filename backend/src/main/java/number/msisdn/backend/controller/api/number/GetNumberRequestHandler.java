package number.msisdn.backend.controller.api.number;

import java.util.Collections;
import java.util.List;

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

    public List<NumberEntity> handle() {
        try {
            String operator = FileUtility.readOperator();
            return numberRepository.findByRecipientOperatorOrderByIdDesc(operator);
        } catch (Exception e) {
            return Collections.emptyList();
        }
    }
}
