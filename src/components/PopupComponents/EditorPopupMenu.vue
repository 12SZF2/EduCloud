<template>
    <div class="editor-container">
        <div class="nav-bar">
            <span class="title">Szerkesztés</span>
        </div>

        <div class="vonal"></div>
        <div class="editor-wrapper">
            <MdEditor v-model="contents" language="en-US" v-on:upload-img="imgupload" class="custom-editor" />
        </div>
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
.vonal {
    width: 90dvw;
    max-width: 1700px;
    height: 2px;
    background-color: #000;
    margin: 0 auto;
}

.editor-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-repeat: no-repeat;
    background-size: cover;
    transition: background 0.5s ease;
}

.nav-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    padding: 10px 20px;
    color: rgb(0, 0, 0);
    z-index: 10;
}

.title {
    font-size: 20px;
    font-weight: bold;
}

.editor-wrapper {
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-top: 20px;
}

.custom-editor {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    display: flex;
    flex-direction: column;
}
</style>
