<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import type { VVirtualScroll } from "vuetify/components";

const consoleLines = reactive([""]);
const commandInput = ref("");

const consoleScroll = ref<VVirtualScroll | null>(null);
const onPressEnterWithCommand = () => {
  if (commandInput.value !== "" && commandInput.value) {
    consoleLines.push(commandInput.value);
    commandInput.value = "";
  }
};

// test
onMounted(() => {
  consoleLines.length = 0;
  for (let i = 0; i < 200; i++) {
    consoleLines.push("line" + i);
  }
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
