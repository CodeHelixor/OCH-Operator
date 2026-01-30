package number.msisdn.backend.controller.api;
import java.util.Collections;
import java.util.List;
import org.springframework.stereotype.Service;

import number.msisdn.backend.database.entities.ErrorEntity;
import number.msisdn.backend.database.repositories.ErrorRepository;

@Service
public class ReadErrorsHandler {
    private ErrorRepository errorRepository;
    
    public ReadErrorsHandler(ErrorRepository errorRepository){
        this.errorRepository = errorRepository;
    }

    public List<ErrorEntity> handle(){
        List<ErrorEntity> errors = errorRepository.findAll();
        Collections.reverse(errors);
        return errors;
    }
}

