import { defineStore } from "pinia";
import { ref } from "vue";
import { Client } from "@stomp/stompjs";
import type { MessageResponse, ConnectionInfo } from "@/script/interfaces/messageInterfaces";
import { GAME_TYPE, GAME_TYPE_URI } from "@/script/const/games";

export const useWebsocket = defineStore("websocket", () => {
  /* States */
  const rcon = ref<Client>();
  const selectedGameType = ref<keyof typeof GAME_TYPE>("PALWORLD");

  /* Getters */

  /* Actions */
  function connectRcon(connectionInfo: ConnectionInfo): Promise<MessageResponse> {
    rcon.value?.deactivate();
    return new Promise((resolve, reject) => {
      try {
        rcon.value = new Client({
          brokerURL: `${import.meta.env.VITE_RCON_API_WS_ENDPOINT_URL}`,
          onConnect() {
            requestRcon(`${GAME_TYPE_URI[selectedGameType.value]}/connect`, connectionInfo)
              .then(response => resolve(response))
              .catch(error => reject(error));
          }
        });
        rcon.value?.activate();
      } catch (error) {
        reject(error);
      }
    });
  }

  function disconnectRcon() {
    return requestRcon(`${GAME_TYPE_URI[selectedGameType.value]}/disconnect`, {}).then(() => rcon.value?.deactivate());
  }

  function executeCommandRcon(command: string) {
    return requestRcon(`${GAME_TYPE_URI[selectedGameType.value]}/command`, { command });
  }

  function requestRcon(destination: string, requestBody: object): Promise<MessageResponse> {
    return new Promise((resolve, reject) => {
      rcon.value?.publish({ destination, body: JSON.stringify(requestBody) });
      const subscribedResponse = rcon.value?.subscribe(
        `${import.meta.env.VITE_RCON_API_WS_USER_SUB_RESPONSE_URI}`,
        message => {
          const data: MessageResponse = JSON.parse(message.body);

          subscribedResponse?.unsubscribe();
          if (data.isSuccess) {
            resolve(data);
          } else {
            reject(new Error(data.body));
          }
        }
      );
    });
  }
  return { rcon, selectedGameType, requestRcon, executeCommandRcon, connectRcon, disconnectRcon };
});
