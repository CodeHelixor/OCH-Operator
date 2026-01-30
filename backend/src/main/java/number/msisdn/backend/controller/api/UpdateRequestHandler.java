package number.msisdn.backend.controller.api;

import java.util.Optional;

import org.springframework.stereotype.Service;

import number.msisdn.backend.controller.requests.UpdateRequest;
import number.msisdn.backend.database.entities.NumberEntity;
import number.msisdn.backend.database.entities.StatusEntity;
import number.msisdn.backend.database.repositories.NumberRepository;
import number.msisdn.backend.database.repositories.StatusRepository;

@Service
public class UpdateRequestHandler {
    private NumberRepository numberRepository;
    private StatusRepository statusRepository;
    public UpdateRequestHandler(NumberRepository numberRepository, StatusRepository statusRepository){
        this.numberRepository = numberRepository;
        this.statusRepository = statusRepository;
    }

    public NumberEntity handle(String id, UpdateRequest request){
        try {
            Long parseId = Long.parseLong(id);
            long statusId = Long.parseLong(request.getPortationStatus());
            Optional<NumberEntity> numberEntityOpt= numberRepository.findById(parseId);
             if (numberEntityOpt.isPresent()) {
                NumberEntity numberEntity = numberEntityOpt.get();

                // Assume registrationDate and portationDate are strings in "yyyy-MM-dd" format

                //I removed before, please be careful====================================================================================
                // numberEntity.setRegdate(LocalDate.parse(request.getRegistrationDate()));
                // numberEntity.setModdate(LocalDate.parse(request.getPortationDate()));

                 StatusEntity status = statusRepository.findById(statusId)
                                   .orElseThrow(() -> new RuntimeException("Status not found"));
                numberEntity.setStatus(status);
                

                numberRepository.save(numberEntity); // Save changes to DB
                return numberEntity;
            } else {
                return null; // Not found
            }
        } catch (Exception e) {
            return null;
        }
    }
}
