<script setup lang="ts">
import { computed, ref } from "vue";
import router from "@/router";
import { useWebsocket } from "@/stores/websocket";
import { GAME_TYPE } from "@/script/const/games";

const selectedGameTab = ref<keyof typeof GAME_TYPE>("MINECRAFT");
const websocket = useWebsocket();

const hostIp = ref("");
const port = ref<number>(25575);
const password = ref("");

const rconLoginInfo = computed(() => {
  return {
    host: hostIp.value,
    port: port.value,
    password: password.value
  };
});

const onClickLoginBtn = () => {
  websocket.selectedGameType = selectedGameTab.value;
  websocket
    .connectRcon(rconLoginInfo.value)
    .then(data => {
      console.log(data);
      router.push({ name: "remoteConsole" });
    })
    .catch(error => {
      console.error(error);
      alert(error);
    });
};
</script>

<template>
  <v-card min-width="20rem" elevation="16">
    <v-tabs v-model="selectedGameTab" align-tabs="center">
      <v-tab :value="GAME_TYPE.MINECRAFT">
        <img width="20" src="@/assets/img/gameIcon/minecraft_64.ico" alt="minecraft_favicon" />
        <span class="ma-1">Minecraft</span>
      </v-tab>
      <v-tab :value="GAME_TYPE.PALWORLD">
        <img :width="'22'" src="@/assets/img/gameIcon/palworld_64.png" alt="palworld_favicon" />
        <span class="ma-1">Palworld</span>
      </v-tab>
    </v-tabs>
    <div class="ma-5">
      <v-text-field label="address" variant="solo" v-model="hostIp"></v-text-field>
      <v-text-field label="address" variant="solo" v-model="port"></v-text-field>
      <v-text-field label="password" type="password" variant="solo" v-model="password"></v-text-field>
      <v-btn size="large" width="100%" @click="onClickLoginBtn">Connect</v-btn>
    </div>
  </v-card>
</template>
