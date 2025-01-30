<template>
  <div class="nav-bar">
       <RouterLink to="/">
      <FontAwesomeIcon
        class="text-4xl hover:invert absolute left-4 top-4"
        :icon="faArrowLeft"
      />
    </RouterLink>
    <span class="title">Szerkesztés</span>
    <UserIcon />
  </div>
  <div class="vonal"></div>
  <div>
    <Editor />
  </div>
</template>

<script setup lang="ts">
import Editor from "../../components/EditorPageComponents/Editor.vue";
import UserIcon from "@/components/userIconComponents/UserIcon.vue";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
</script>

<style scoped>
.editor-container {
position: relative;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
width: 100%;
height: 100vh;
background-repeat: no-repeat;
background-size: cover;
transition: background 0.5s ease;
padding: 0;
margin: 0;
box-sizing: border-box;
}

.vonal {
width: 90%;
max-width: 1700px;
height: 2px;
background-color: #000;
margin: 0 auto;
}

.editor-wrapper {
width: 90%;
max-width: 1200px;
height: 70vh;
max-height: 800px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(10px);
border-radius: 15px;
box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
overflow: hidden;
margin: 20px auto 0;
}

.nav-bar {
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
padding: 10px 20px;
color: rgb(0, 0, 0);
z-index: 10;
}

.back-button {
background: none;
border: none;
color: rgb(0, 0, 0);
font-size: 20px;
cursor: pointer;
text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

.title {
font-size: 20px;
font-weight: bold;
text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}
</style>
