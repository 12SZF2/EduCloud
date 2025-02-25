<script setup>
import ThemeButton from "@/components/themeButtonComponents/ThemeButton.vue";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useCookies } from "vue3-cookies";
import { jwtDecode } from "jwt-decode";

document.title = "EduCloud | Kezdőlap";

const isSizeCompatible = ref(true);

const checkWindowSize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  isSizeCompatible.value = width >= 344 && height >= 470;
};

const isAdmin = ref(false);
const { cookies } = useCookies();

const isJwtValid = (token) => {
  if (!token) return false;
  try {
    const decoded = jwtDecode(token);
    return decoded && decoded.exp * 1000 > Date.now();
  } catch (error) {
    return false;
  }
};

const checkRole = () => {
  const jwtToken = cookies.get("access_token");
  isAdmin.value = isJwtValid(jwtToken);
};

onMounted(() => {
  checkWindowSize();
  checkRole();
  window.addEventListener("resize", checkWindowSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkWindowSize);
});
</script>

<template>
  <div class="view-page" v-if="isSizeCompatible">
    <link
      href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
      rel="stylesheet"
    />
    <div class="container h-[100dvh] w-[100dvw]">
      <header class="header">
        <input type="checkbox" id="check" />
        <label for="check" class="icons">
          <i class="bx bx-menu" id="menu-icon"></i>
          <i class="bx bx-x" id="close-icon"></i>
        </label>

        <nav
          class="navbar flex flex-col float-right md:flex-row mr-5 mt-5 md:space-x-4"
        >
          <a>
            <router-link
              style="--i: 0"
              to="listing"
              class="asd !text-[var(--nav-button-text)] hover:underline"
              >Szakmák</router-link
            >
          </a>
          <a>
            <router-link
              style="--i: 1"
              to="login"
              class="!text-[var(--nav-button-text)] hover:underline"
              >Bejelentkezés</router-link
            >
          </a>
          <a>
            <router-link style="--i: 2" to=""></router-link>
          </a>
          <a v-if="isAdmin">
            <router-link
              style="--i: 3"
              to="admin"
              class="text-white hover:underline"
              >Admin</router-link
            >
          </a>
        </nav>
      </header>
    </div>
    <div class="flex justify-end" id="rightSide">
      <div class="fixed-bottom-left font-semibold">
        <h1 class="fontstyle typingEffect">EduCloud</h1>
        <ThemeButton></ThemeButton>
      </div>
    </div>
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

#menu-icon {
  color: var(--text-color);
}

#close-icon {
  color: var(--text-color);
}

.header {
  position: fixed;
  width: 100%;
  justify-content: space-between;
  z-index: 100;
  padding: 1.3rem;
}

.header::before {
  z-index: -12;
}

.table {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(50px);
  width: 70%;
  height: 60%;
  margin-top: -3%;
  border-radius: 10px;
}

.navbar a {
  font-size: 1.15rem;
  color: var(--text-color);
  text-decoration: none;
  transition: 0.3s;
  text-shadow: 0 0 2px #000000;
}

.navbar a:hover,
.navbar a:active,
.navbar a:focus {
  transform: translateY(-1px);
  text-decoration: underline;
}

#check {
  display: none;
}

.icons {
  right: 3%;
  position: absolute;
  font-size: 2.8rem;
  cursor: pointer;
  color: white;
  display: none;
}

@media (max-width: 910px) {
  .icons {
    display: inline-flex;
  }

  #check:checked ~ .icons #menu-icon {
    display: none;
  }

  .icons #close-icon {
    display: none;
  }

  #check:checked ~ .icons #close-icon {
    display: block;
  }

  .navbar {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    right: 20px;
    transition: all 0.3s ease-in-out;
  }

  #check:checked ~ .navbar {
    height: 8.5rem;
  }

  .navbar a {
    display: block;
    font-size: 1.1rem;
    margin: 0.3rem -3px;
    text-align: right;
    opacity: 0;
    transform: translatex(200px);
    transition: all 0.13s ease;
  }

  #check:checked ~ .navbar a {
    transform: translateY(0);
    opacity: 12;
    transition-delay: calc(0.1s * var(--i));
  }
}

.fixed-bottom-left {
  position: fixed;
  bottom: 0;
  left: 0;
  margin: 30px;
}

h1 {
  font-size: 17vh;
  font-family: Oswald;
  margin: 0;
  line-height: 1;
  transition: 0.3s;
  color: var(--text-color);
}

@media (max-width: 1000px) {
  h1 {
    font-size: 12vh;
  }
}

@media (max-width: 710px) {
  h1 {
    font-size: 8vh;
  }
}

@media (max-width: 430px) {
  h1 {
    font-size: 5vh;
  }
}

.fixed-top-right {
  position: fixed;
  top: 0;
  right: 0;
  margin: 2%;
  margin-right: 3%;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: inline;
}

.router-link {
  text-decoration: underline;
}
.typingEffect {
  width: 0;
  overflow: hidden; /* Ensure the text is not visible until the typewriter effect*/
  border-right: 2px solid white; /* The cursor*/
  white-space: nowrap; /* Keeps the text on a single line */
  animation: typing 1s steps(8) forwards, blink 1s infinite;
}

/* The typing animation */
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
@keyframes blink {
  0%,
  45% {
    border-color: transparent;
  }
  50%,
  100% {
    border-color: white;
  }
}
</style>
