package number.msisdn.backend.controller.api;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

import number.msisdn.backend.database.entities.NumberEntity;
import number.msisdn.backend.database.entities.TasklistEntity;
import number.msisdn.backend.database.repositories.NumberRepository;
import number.msisdn.backend.database.repositories.TasklistRepository;

@Service
public class ReadTaskListsRequestHandler {
    private final TasklistRepository tasklistRepository;
    private final NumberRepository numberRepository;

    public ReadTaskListsRequestHandler(TasklistRepository tasklistRepository, NumberRepository numberRepository) {
        this.tasklistRepository = tasklistRepository;
        this.numberRepository = numberRepository;
    }

    /**
     * Returns tasks in descending id order, but only those whose telephone number
     * exists in the number table. Tasks for numbers not present in numbertable are excluded.
     */
    public List<TasklistEntity> handle() {
        List<NumberEntity> allNumbers = numberRepository.findAllByOrderByIdDesc();
        Set<String> existingNumbers = allNumbers.stream()
                .map(NumberEntity::getTelephoneNumber)
                .filter(phone -> phone != null && !phone.isBlank())
                .collect(Collectors.toSet());

        return tasklistRepository.findAllByOrderByIdDesc().stream()
                .filter(task -> {
                    String phone = task.getTelephoneNumber();
                    return phone != null && existingNumbers.contains(phone);
                })
                .collect(Collectors.toList());
    }
}
