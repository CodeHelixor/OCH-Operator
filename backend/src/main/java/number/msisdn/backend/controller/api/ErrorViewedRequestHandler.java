package number.msisdn.backend.controller.api;

import java.util.Optional;

import org.springframework.stereotype.Service;

import number.msisdn.backend.database.entities.ErrorEntity;
import number.msisdn.backend.database.repositories.ErrorRepository;

@Service
public class ErrorViewedRequestHandler {
    private ErrorRepository errorRepository;

    public ErrorViewedRequestHandler(ErrorRepository errorRepository){
        this.errorRepository = errorRepository;
    }

    public boolean handle(String uniqueId){
        try {
            Optional<ErrorEntity> optionalEntity = errorRepository.findByUniqueId(uniqueId);
            if(optionalEntity.isPresent()){
                ErrorEntity entity = optionalEntity.get();
                entity.setIsViewed(true);
                errorRepository.save(entity);
                return true;
            } else{
                return false;
            }
        } catch (Exception e) {
            return false;
        }
    }
}
