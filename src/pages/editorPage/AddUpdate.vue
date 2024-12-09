<template>
  <div
    class="editor-container"
    :style="{ backgroundImage: `url(${currentBackground})` }"
  >
    <div class="back-arrow" @click="goBack">←</div>
  
    <div class="editor-wrapper">
      <!-- Top Title -->
      <div class="editor-title">Szerkesztés</div>

      <!-- Editor Component -->
      <MdEditor
        v-model="contents"
        language="en-US"
        v-on:upload-img="imgupload"
        class="custom-editor"
      />

      <!-- Background Selector -->
      <div class="background-controls">
        <select class="bg-dropdown" v-model="currentBackground">
          <option
            v-for="(image, index) in backgrounds"
            :key="index"
            :value="image"
          >
            Background {{ index + 1 }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { ref } from "vue";

// Editor content
const contents = ref("# Hello World");

// Image upload handler
const imgupload = (e) => {
  console.debug("Uploaded img" + e);
};

// Background images
const backgrounds = ["imgs/day.jpg", "imgs/nightWest.jpg"];
const currentBackground = ref(backgrounds[0]);

// Function to change background
const changeBackground = (image: string) => {
  currentBackground.value = image;
};

const goBack = () => {
  window.history.back();
};
</script>

<style scoped>
/* Container for the editor */
.editor-container {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-size: cover;
  transition: background 0.5s ease;
}

/* Wrapper for the editor and dropdown */
.editor-wrapper {
  width: 90%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

/* Title Styling */
.editor-title {
  position: absolute;
  top: -55px; /* Adjust position based on layout */
  font-size: 24px;
  font-weight: bold;
  color: #000000;
  z-index: 2; /* Ensure it stays above the editor */
}

/* Editor component styling with frosted-glass effect */
.custom-editor {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1); /* Light tint for frosted effect */
  backdrop-filter: blur(10px); /* Frosted-glass effect */
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* Toolbar customization */
.custom-editor .md-editor-v3-toolbar {
  background: rgba(0, 0, 0, 0.4); /* Dark translucent toolbar */
  color: #fff;
}

/* Content area customization */
.custom-editor .md-editor-v3-content {
  background: transparent; /* Ensures frosted glass remains visible */
  color: #333; /* Text color for better readability */
  font-size: 16px; /* Improved readability */
}

/* Dropdown styling */
.background-controls {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bg-dropdown {
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  background-color: rgba(255, 255, 255, 0.8); /* Translucent background */
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.bg-dropdown:hover {
  border-color: #888;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}
.back-arrow {
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 45px;
  color: #000000;
  cursor: pointer;
  z-index: 3;
  transition: color 0.3s ease;
}
</style>
