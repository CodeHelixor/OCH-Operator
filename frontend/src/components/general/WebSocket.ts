import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const API_BASE_URL =
  window._env_?.REACT_APP_API_BASE_URL || "http://localhost:8080";
const socketUrl = `${API_BASE_URL}/ws`;
let stompClient: Client;

export const connectWebSocket = (
  sessionId: string,
  onSuccess: (data: any) => void,
  onError: (error: any) => void
) => {
  stompClient = new Client({
    webSocketFactory: () => new SockJS(socketUrl),
    onConnect: () => {
      stompClient.subscribe("/topic/success", (message: IMessage) => {
        const data = JSON.parse(message.body);
        onSuccess(data);
      });

      stompClient.subscribe(
        `/queue/errors-${sessionId}`,
        (message: IMessage) => {
          const error = JSON.parse(message.body);
          onError(error);
        }
      );
    },
  });

  stompClient.activate();
};
