package number.msisdn.backend.controller.api;

import java.util.List;
import org.springframework.stereotype.Service;

import number.msisdn.backend.database.entities.TasklistEntity;
import number.msisdn.backend.database.repositories.TasklistRepository;

@Service
public class ReadTaskListsRequestHandler {
    private final TasklistRepository tasklistRepository;

    public ReadTaskListsRequestHandler(TasklistRepository tasklistRepository) {
        this.tasklistRepository = tasklistRepository;
    }

    public List<TasklistEntity> handle() {
        return tasklistRepository.findAllByOrderByIdDesc();
    }
}
