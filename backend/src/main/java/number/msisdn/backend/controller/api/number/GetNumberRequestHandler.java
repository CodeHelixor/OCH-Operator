package number.msisdn.backend.controller.api.number;

import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;

import number.msisdn.backend.database.entities.NumberEntity;
import number.msisdn.backend.database.repositories.NumberRepository;

@Service
public class GetNumberRequestHandler {
    private NumberRepository numberRepository;

    public GetNumberRequestHandler(NumberRepository numberRepository){
        this.numberRepository = numberRepository;
    }
    public List<NumberEntity> handle(){
        List<NumberEntity> numbers = numberRepository.findAll();
        Collections.reverse(numbers);
        return numbers;
    }
}
