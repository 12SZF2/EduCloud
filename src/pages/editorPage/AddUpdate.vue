<template>
  <div class="editor-container" :style="{ backgroundImage: `url(${currentBackground})` }">
    <!-- Navigációs sáv -->
    <div class="nav-bar">
      <button class="back-button">←</button>
      <span class="title">Szerkesztés</span>
      <button class="user-button">👤</button>
    </div>

    <div class="vonal">
    </div>

    <div class="editor-wrapper">
      <MdEditor
        v-model="contents"
        language="en-US"
        v-on:upload-img="imgupload"
        class="custom-editor"
      />
   <br>
      <div class="background-controls">
        <button class="bg-button" @click="toggleBackground">Háttér változtatás</button>
      </div>
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

const backgrounds = [
  "imgs/day.jpg",    
  "imgs/night.jpg",  
];

const currentBackground = ref(backgrounds[0]);
const toggleBackground = () => {
  currentBackground.value = currentBackground.value === backgrounds[0] ? backgrounds[1] : backgrounds[0];
};
</script>

<style scoped>
.vonal{
  width: 90dvw;  /* A vonal hossza a képernyő szélességének 50%-a */
  max-width: 1700px;  /* Maximális szélesség, hogy ne legyen túl hosszú */
  height: 2px;   /* A vonal vastagsága */
  background-color: #000; /* A vonal színe */
  margin: 0 auto; /* Középre igazítja a vonalat */
}
.editor-container {
  position: relative;
  width: 100%;
  height: 100vh;
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
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  color: rgb(0, 0, 0);
  z-index: 10; 
  backdrop-filter: blur(10px); 
}

.back-button,
.user-button {
  background: none;
  border: none;
  color: rgb(0, 0, 0);
  font-size: 20px;
  cursor: pointer;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5); /* Szöveg árnyékolása */
}

.title {
  font-size: 20px;
  font-weight: bold;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5); /* Szöveg árnyékolása */
}

/* Wrapper for the editor and dropdown */
.editor-wrapper {
  width: 90%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-top: 20px; /* Hely a navigációs sáv alatt */
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

/* Background Button Styling */
.bg-button {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: rgba(0, 0, 0, 0.8); /* Sötét gomb */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.bg-button:hover {
  background-color: rgba(0, 0, 0, 1);
  transform: scale(1.05); /* Kis nagyítás hatás */
}

.bg-button:active {
  transform: scale(0.95); /* Nyomásra kisebb hatás */
}
</style>
