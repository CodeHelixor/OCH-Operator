package number.msisdn.backend.controller.api.task;

import org.springframework.stereotype.Service;

import number.msisdn.backend.database.entities.TasklistEntity;
import number.msisdn.backend.database.repositories.NumberRepository;
import number.msisdn.backend.database.repositories.TasklistRepository;

@Service
public class DeleteTaskHandler {
    private final TasklistRepository tasklistRepository;
    private final NumberRepository numberRepository;

    public DeleteTaskHandler(TasklistRepository tasklistRepository, NumberRepository numberRepository) {
        this.tasklistRepository = tasklistRepository;
        this.numberRepository = numberRepository;
    }

    /**
     * Deletes the task row with the given id from the tasklisttable, and also
     * removes the corresponding row in the numbertable (by telephone number).
     *
     * @param id task list table row id
     * @return true if the task existed and was deleted, false otherwise
     */
    public boolean handle(Long id) {
        if (id == null) {
            return false;
        }
        return tasklistRepository.findById(id)
                .map(task -> {
                    String telephoneNumber = task.getTelephoneNumber();
                    tasklistRepository.delete(task);
                    // Remove corresponding row(s) in numbertable for this phone number
                    if (telephoneNumber != null && !telephoneNumber.isEmpty()) {
                        numberRepository.findByTelephoneNumber(telephoneNumber)
                                .forEach(numberRepository::delete);
                    }
                    return true;
                })
                .orElse(false);
    }
}
