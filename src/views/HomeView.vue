<script setup lang="ts">
import { computed, ref } from "vue";
import router from "@/router";
import { useWebsocket } from "@/stores/websocket";
import { Client, type IMessage } from "@stomp/stompjs";

const selectedGameTab = ref("");
const websocket = useWebsocket();

const hostIp = ref("");
const port = ref<number>(0);
const password = ref("");

const rconLoginInfo = computed(() => {
  return {
    host: hostIp.value,
    port: port.value,
    password: password.value
  };
});

const onClickLoginBtn = () => {
  websocket.rcon = new Client({
    brokerURL: `${process.env.VUE_APP_RCON_API_WS_ENDPOINT_URL}`
  });
  websocket.connectRcon(rconLoginInfo.value, (message: IMessage) => {
    console.log(message.body);
    router.push("remoteConsole");
  });
};
</script>

<template>
  <v-card min-width="20rem" elevation="16">
    <v-tabs v-model="selectedGameTab" align-tabs="center">
      <v-tab value="Minecraft">
        <img width="20" src="@/assets/img/gameIcon/minecraft_64.ico" alt="minecraft_favicon" />
        <span class="ma-1">Minecraft</span>
      </v-tab>
      <v-tab value="Palworld">
        <img :width="'22'" src="@/assets/img/gameIcon/palworld_64.png" alt="palworld_favicon" />
        <span class="ma-1">Palworld</span>
      </v-tab>
    </v-tabs>
    <div class="ma-5">
      <v-text-field label="address" variant="solo"></v-text-field>
      <v-text-field label="password" type="password" variant="solo"></v-text-field>
      <v-btn size="large" width="100%" @click="onClickLoginBtn">Log In</v-btn>
    </div>
  </v-card>
</template>
