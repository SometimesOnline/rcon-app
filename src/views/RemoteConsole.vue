<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref } from "vue";
import type { VVirtualScroll } from "vuetify/components";
import { useWebsocket } from "@/stores/websocket";
import router from "@/router";

const consoleLines = reactive([""]);
const commandInput = ref("");

const websocket = useWebsocket();

const consoleScroll = ref<VVirtualScroll | null>(null);
const onPressEnterWithCommand = () => {
  if (commandInput.value !== "" && commandInput.value) {
    consoleLines.push(commandInput.value);
    websocket
      .executeCommandRcon(commandInput.value)
      .then(response => {
        console.log(response);
        consoleLines.push(response.body);
      })
      .catch(error => console.error(error));
    commandInput.value = "";
  }
};

onMounted(() => {
  if (!websocket.rcon?.connected) {
    alert("서버와의 연결이 끊어졌습니다. 연결 페이지로 이동합니다.");
    router.replace({ name: "home" }); // history 에 추가되지 않음.(뒤로가기 불가)
    return;
  }
  consoleLines.push(`connected to ${websocket.selectedGameType} server`);
});

onBeforeUnmount(() => {
  websocket.disconnectRcon();
});
</script>

<template>
  <v-card min-width="20rem" elevation="16" class="text-left">
    <h2 class="border-b">Remote Console</h2>
    <v-virtual-scroll
      :height="500"
      :width="700"
      :items="consoleLines"
      ref="consoleScroll"
      class="flex-column-reverse d-flex">
      <template v-slot:default="{ item }">
        <div class="px-1">{{ item }}</div>
      </template>
    </v-virtual-scroll>
    <v-text-field
      v-model="commandInput"
      variant="underlined"
      label="command"
      bg-color="grey-lighten-3"
      @keydown.enter="onPressEnterWithCommand" />
  </v-card>
</template>

<style scoped></style>
