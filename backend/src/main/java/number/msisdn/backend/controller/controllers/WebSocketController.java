package number.msisdn.backend.controller.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {
     @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public void sendToOneUser(String sessionId, String msg) {
        messagingTemplate.convertAndSendToUser(sessionId, "/queue/error", msg);
    }

    public void sendToAllUser(String msg) {
        messagingTemplate.convertAndSend("/topic/success", msg);
    }
}
