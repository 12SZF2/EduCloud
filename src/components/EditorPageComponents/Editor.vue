<template>
  <div class="editor-wrapper">
    <MdEditor
      v-model="contents"
      language="en-US"
      v-on:upload-img="imgupload"
      class="custom-editor"
    />
  </div>
</template>

<script setup lang="ts">
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { ref } from "vue";

const contents = ref("# Hello World");
const imgupload = (e) => {
  console.debug("Uploaded img" + e);
};
</script>

<style scoped>
.custom-editor {
  width: 100%;
  height: 100%;
  background-color: transparent;
  backdrop-filter: blur(10px); 
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  flex-direction: column;
}
</style>

