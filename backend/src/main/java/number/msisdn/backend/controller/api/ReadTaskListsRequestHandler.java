package number.msisdn.backend.controller.api;

import java.util.Collections;
import java.util.List;
import org.springframework.stereotype.Service;

import number.msisdn.backend.database.entities.TasklistEntity;
import number.msisdn.backend.database.repositories.TasklistRepository;
import number.msisdn.backend.general.FileUtility;

@Service
public class ReadTaskListsRequestHandler {
    private final TasklistRepository tasklistRepository;

    public ReadTaskListsRequestHandler(TasklistRepository tasklistRepository) {
        this.tasklistRepository = tasklistRepository;
    }

    public List<TasklistEntity> handle() {
        try {
            String operator = FileUtility.readOperator();
            return tasklistRepository.findByRecipientOperatorOrderByIdDesc(operator);
        } catch (Exception e) {
            return Collections.emptyList();
        }
    }
}
