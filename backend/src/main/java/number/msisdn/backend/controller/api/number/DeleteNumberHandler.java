package number.msisdn.backend.controller.api.number;

import org.springframework.stereotype.Service;

import number.msisdn.backend.database.entities.NumberEntity;
import number.msisdn.backend.database.repositories.NumberRepository;

@Service
public class DeleteNumberHandler {
    private final NumberRepository numberRepository;

    public DeleteNumberHandler(NumberRepository numberRepository) {
        this.numberRepository = numberRepository;
    }

    /**
     * Deletes the number row with the given id from the number table.
     *
     * @param id number table row id
     * @return true if the number existed and was deleted, false otherwise
     */
    public boolean handle(Long id) {
        if (id == null) {
            return false;
        }
        return numberRepository.findById(id)
                .map(number -> {
                    numberRepository.delete(number);
                    return true;
                })
                .orElse(false);
    }
}
