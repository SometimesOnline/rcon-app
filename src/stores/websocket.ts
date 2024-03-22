import { defineStore } from "pinia";
import { ref } from "vue";
import { Client, type IMessage } from "@stomp/stompjs";

export const useWebsocket = defineStore("websocket", () => {
  /* States */
  const rcon = ref<Client>();

  /* Getters */

  /* Actions */
  function connectRcon(
    connectInfo: { host: string; port: number; password: string },
    responseCallback: (message: IMessage) => void
  ) {
    rcon.value = new Client({
      brokerURL: `${process.env.VUE_APP_RCON_API_WS_ENDPOINT_URL}`
    });

    requestRcon(`${process.env.VUE_APP_RCON_API_WS_PALWORLD}/connect`, connectInfo, responseCallback);
  }

  function requestRcon(destination: string, request: object, responseCallback: (message: IMessage) => void) {
    rcon.value?.publish({ destination: destination, body: JSON.stringify(request) });
    const subscribedResponse = rcon.value?.subscribe(
      `${process.env.VUE_APP_RCON_API_WS_USER_SUB_RESPONSE_URL}`,
      message => {
        responseCallback(message);
        subscribedResponse?.unsubscribe();
      }
    );
    return;
  }

  return { rcon, connectRcon, requestRcon };
});
