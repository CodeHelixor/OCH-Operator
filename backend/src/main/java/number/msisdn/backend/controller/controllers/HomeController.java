package number.msisdn.backend.controller.controllers;
import java.util.List;
import org.springframework.web.bind.annotation.RestController;

import number.msisdn.backend.controller.api.ErrorViewedRequestHandler;
import number.msisdn.backend.controller.api.ReadErrorsHandler;
import number.msisdn.backend.controller.api.ReadTaskListsRequestHandler;
import number.msisdn.backend.controller.api.UpdateRequestHandler;
import number.msisdn.backend.controller.api.notification.DeleteNotificationHandler;
import number.msisdn.backend.controller.api.notification.ReadNotificationsHandler;
import number.msisdn.backend.controller.api.task.DeleteTaskHandler;
import number.msisdn.backend.controller.requests.UpdateRequest;
import number.msisdn.backend.database.entities.ErrorEntity;
import number.msisdn.backend.database.entities.NotifyEntity;
import number.msisdn.backend.database.entities.NumberEntity;
import number.msisdn.backend.database.entities.TasklistEntity;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class HomeController {
    private UpdateRequestHandler updateRequestHandler;
    private ReadTaskListsRequestHandler readTaskListsRequestHandler;
    private ReadErrorsHandler readErrorsHandler;
    private ErrorViewedRequestHandler errorViewedRequest;
    private ReadNotificationsHandler readNotificationsHandler;
    private DeleteNotificationHandler deleteNotificationHandler;
    private DeleteTaskHandler deleteTaskHandler;

    public HomeController(UpdateRequestHandler updateRequestHandler, ReadTaskListsRequestHandler readTaskListsRequestHandler, ReadErrorsHandler readErrorsHandler, ErrorViewedRequestHandler errorViewedRequest, ReadNotificationsHandler readNotificationsHandler, DeleteNotificationHandler deleteNotificationHandler, DeleteTaskHandler deleteTaskHandler){
        this.updateRequestHandler = updateRequestHandler;
        this.readTaskListsRequestHandler = readTaskListsRequestHandler;
        this.readErrorsHandler = readErrorsHandler;
        this.errorViewedRequest = errorViewedRequest;
        this.readNotificationsHandler = readNotificationsHandler;
        this.deleteNotificationHandler = deleteNotificationHandler;
        this.deleteTaskHandler = deleteTaskHandler;
    } 

    @PostMapping("/get/tasks")
    public List<TasklistEntity> handleReadTaskRequest(){
        return readTaskListsRequestHandler.handle();
    }

    @PostMapping("/update/{id}")
    public NumberEntity handleUpdateRequest(@PathVariable String id, @RequestBody UpdateRequest request) {
        return updateRequestHandler.handle(id, request);
    }


    @PostMapping("/readErrors")
    public List<ErrorEntity> handleErrorRequest(){
        return readErrorsHandler.handle();
    }

    @PostMapping("/errorViewed/{uniqueId}")
    public boolean handleErrorViewedRequest(@PathVariable String uniqueId){
        return errorViewedRequest.handle(uniqueId);
    }

    @PostMapping("/readNotifications")
    public List<NotifyEntity> handleNotificationsRequest(){
        return readNotificationsHandler.handle();
    }   

    @PostMapping("/deleteNotify/{id}")
    public boolean handleDeleteNotifyRequest(@PathVariable String id){
        return deleteNotificationHandler.handle(id);
    }

    @PostMapping("/deleteTask/{id}")
    public ResponseEntity<Boolean> handleDeleteTaskRequest(@PathVariable Long id){
        boolean deleted = deleteTaskHandler.handle(id);
        return ResponseEntity.ok(deleted);
    }
        
}

