package number.msisdn.backend.controller.api.notification;
import java.util.Collections;
import java.util.List;
import org.springframework.stereotype.Service;

import number.msisdn.backend.database.entities.NotifyEntity;
import number.msisdn.backend.database.repositories.NotifyRepository;

@Service
public class ReadNotificationsHandler {
    private NotifyRepository notifyRepository;
    
    public ReadNotificationsHandler(NotifyRepository notifyRepository){
        this.notifyRepository = notifyRepository;
    }

    public List<NotifyEntity> handle(){
        List<NotifyEntity> notifications = notifyRepository.findAll();
        Collections.reverse(notifications);
        return notifications;
    }
}

