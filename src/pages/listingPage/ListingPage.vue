<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

document.title = "EduCloud | Szakmák";

const isSizeCompatible = ref(true);

const checkWindowSize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  isSizeCompatible.value = width >= 344 && height >= 470;
};

onMounted(() => {
  checkWindowSize();
  window.addEventListener("resize", checkWindowSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkWindowSize);
});

const saveCardToCookie = (name: string) => {
  document.cookie = `selected_profession=${name}; path=/; max-age=31536000; SameSite=Lax`;
};
</script>

<template>
  <div class="view-page" v-if="isSizeCompatible">
    <section id="tranding">
      <RouterLink to="/" class="absolute left-4 top-4">
        <FontAwesomeIcon class="text-4xl hover:invert" :icon="faArrowLeft" />
      </RouterLink>
      <h1 class="section-heading">Szakmák</h1>
      <div class="containerr">
        <div class="container">
          <a
            href="/view"
            class="card"
            @click="() => saveCardToCookie('Szoftverfejlesztő és -tesztelő')"
          >
            <div class="images" id="szoftverF">
              <div class="card-content">
                <h2 class="szakma-name">Szoftverfejlesztő és -tesztelő</h2>
              </div>
            </div>
          </a>
          <a
            href="/view"
            class="card"
            @click="() => saveCardToCookie('Elektro Technikus')"
          >
            <div class="images" id="elektroT">
              <div class="card-content">
                <h2 class="szakma-name">Elektro Technikus</h2>
              </div>
            </div>
          </a>
          <a
            href="/view"
            class="card"
            @click="() => saveCardToCookie('Automatikai Technikus')"
          >
            <div class="images" id="autoT">
              <div class="card-content">
                <h2 class="szakma-name">Automatikai Technikus</h2>
              </div>
            </div>
          </a>
          <a
            href="/view"
            class="card"
            @click="() => saveCardToCookie('Rendszerüzemeltető')"
          >
            <div class="images" id="redszerU">
              <div class="card-content">
                <h2 class="szakma-name">Rendszerüzemeltető</h2>
              </div>
            </div>
          </a>
          <a
            href="/view"
            class="card"
            @click="() => saveCardToCookie('Közismeret')"
          >
            <div class="images" id="kozismeret">
              <div class="card-content">
                <h2 class="szakma-name">Közismeret</h2>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  </div>
  <div class="size-error" v-else>
    <p>Ekkora méretben az oldal nem megtekinthető</p>
  </div>
</template>

<style scoped>
.size-error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: var(--text-color);
}

.view-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  color: var(--text-color);
}

:root {
  --primary: #ec994b;
  --white: #ffffff;
  --bg: #f5f5f5;
  --slider-bg: #222224;
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style-type: none;
  text-decoration: none;
}

.containerr {
  z-index: -1;
  margin: 0 auto;
  padding: 1.5rem 1.5rem;
  display: flex;
  overflow-y: auto;
  max-width: 1000px;
  max-height: 80dvh;
  scrollbar-width: thin;
  border-radius: 25px;
  background-color: rgba(124, 124, 124, 0.418);
  scrollbar-color: var(--primary) #c94040;
  backdrop-filter: blur(50px);
}

.container {
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  overflow-y: auto;
  max-width: 1000px;
  max-height: 80dvh;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2);
}
.container::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
}

.containerr::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background: rgba(0, 0, 0, 0.2);
}

.containerr::-webkit-scrollbar {
  width: 10px;
  background-color: #f5f5f5;
}

.containerr::-webkit-scrollbar-thumb {
  background-color: #000000;
  border: 2px solid #000000;
}

.card {
  min-height: 15rem;
  display: flex;
  flex-direction: row;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 8px 20px rgb(0, 0, 0);
  background-color: rgba(255, 255, 255, 0.219);
  backdrop-filter: blur(50px);
  width: 100%;
  height: 15rem;
  transition: transform 0.3s ease-in-out;
}

.card:hover {
  transform: scale(1.03);
}

.images {
  flex: 1;
  height: 100%;
}

#szoftverF {
  background-image: url("../../../public/imgs/szoftver.jpg");
  background-size: cover;
  background-position: center;
}

#elektroT {
  background-image: url("../../../public/imgs/elektro.jpg");
  background-size: cover;
  background-position: center;
}

#autoT {
  background-image: url("../../../public/imgs/automatikaiTechnikus.jpg");
  background-size: cover;
  background-position: center;
}

#redszerU {
  background-image: url("../../../public/imgs/rendszeruzemelteto.jpg");
  background-size: cover;
  background-position: center;
}

#kozismeret {
  background-image: url("../../../public/imgs/kozismeret.jpg");
  background-size: cover;
  background-position: center;
}

.images img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-content {
  flex: 1;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.301) 0%,
    rgba(0, 0, 0, 1) 76%
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  color: var(--white);
  text-align: right;
  padding: 0 2rem;
  height: 100%;
}

.szakma-name {
  color: white;
  font-size: 1.8rem;
  font-weight: bold;
  transition: 0.1s;
}

.button-container {
  margin-top: 1rem;
}
.section-heading {
  font-size: 3rem;
  color: var(--text-color);
  text-shadow: rgb(0, 0, 0) 0px 0px 15px;
  padding: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
}

@media (max-width: 768px) {
  .card {
    flex-direction: column;
  }

  .images {
    width: 100%;
    height: auto;
  }

  .card-content {
    width: 100%;
  }
}

@media (max-width: 465px) {
  .szakma-name {
    font-size: 2.1dvh;
  }
}
</style>
