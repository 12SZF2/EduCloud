<template>
    <div class="editor-container">
        <div class="nav-bar">
            <span class="title">Szerkesztés</span>
        </div>

        <div class="vonal"></div>
        <div class="editor-wrapper">
            <MdEditor v-model="content" language="en-US" v-on:upload-img="imgupload" class="custom-editor"
                :theme="isDarkTheme ? 'dark' : 'light'" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { ref, onMounted } from "vue";

const content = defineModel('content', {
    type: String,
    default: "# Hello World"
});
const imgupload = (e) => {
    console.debug("Uploaded img" + e);
};

// Dark theme meghatározása
const isDarkTheme = ref(false);

onMounted(() => {
    // Ellenőrizzük a `--background-color` változó értékét
    const backgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--background-color").trim();
    isDarkTheme.value = backgroundColor === "black";
});
</script>

<style scoped>
.vonal {
    width: 90dvw;
    max-width: 1700px;
    height: 2px;
    background-color: var(--text-color);
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
    color: var(--text-color);
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
    color: var(--text-color);
    background: var(--background-color);
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    display: flex;
    flex-direction: column;
}
</style>
