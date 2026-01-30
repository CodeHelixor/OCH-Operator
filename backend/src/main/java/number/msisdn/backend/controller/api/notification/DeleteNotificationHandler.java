package number.msisdn.backend.controller.api.notification;

import org.springframework.stereotype.Service;

import number.msisdn.backend.database.entities.NotifyEntity;
import number.msisdn.backend.database.repositories.NotifyRepository;

@Service
public class DeleteNotificationHandler {
    private NotifyRepository notifyRepository;

    public DeleteNotificationHandler(NotifyRepository notifyRepository){
        this.notifyRepository = notifyRepository;
    }
    
    public boolean handle(String id){
        Long longId = Long.parseLong(id);
        NotifyEntity notifyEntity = notifyRepository.findById(longId).orElse(null);
        if (notifyEntity != null) {
            notifyRepository.delete(notifyEntity);
            return true;
        } else {
            return false;
        }
    }
}
