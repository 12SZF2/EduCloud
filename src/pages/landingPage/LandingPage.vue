<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, Ref } from 'vue';

const isRain = ref(false); // Az eső alapértelmezés szerint ne essen
let counter = 0;

const toggleRain = (): void => {
  if (counter === 0) {
    initCanvas();
    counter++;
  }
  isRain.value = !isRain.value;
};

const canvas: Ref<HTMLCanvasElement | null> = ref(null);
let ctx: CanvasRenderingContext2D | null = null;
let width = 0;
let height = 0;

let mouse = { X: 0, Y: 0 };

type Particle = {
  vitesseX: number;
  vitesseY: number;
  X: number;
  Y: number;
  alpha: number;
  couleur: string;
};
type Drop = {
  vitesseX: number;
  vitesseY: number;
  X: number;
  Y: number;
  radius: number;
  alpha: number;
  couleur: string;
};

let particules: Particle[] = [];
let gouttes: Drop[] = [];

interface Controls {
  rain: number;
  Object: string;
  alpha: number;
  color: number;
  auto: boolean;
  opacity: number;
  saturation: number;
  lightness: number;
  back: number;
  red: number;
  green: number;
  blue: number;
  multi: boolean;
  speed: number;
}

let controls: Controls = {
  rain: 0,
  Object: 'Nothing',
  alpha: 1,
  color: 200,
  auto: false,
  opacity: 1,
  saturation: 100,
  lightness: 50,
  back: 100,
  red: 0,
  green: 0,
  blue: 0,
  multi: false,
  speed: 0.5,
};

const requestAnimFrame = (() => {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback: FrameRequestCallback): number {
      return window.setTimeout(callback, 1000 / 60);
    }
  );
})();

const Rain = (X: number, Y: number, nombre = 2): void => {
  while (nombre--) {
    particules.push({
      vitesseX: Math.random() * 0.25,
      vitesseY: Math.random() * 4 + 1,
      X,
      Y,
      alpha: 1,
      couleur: `hsla(${controls.color},${controls.saturation}%,${controls.lightness}%,${controls.opacity})`,
    });
  }
};

const explosion = (X: number, Y: number, couleur: string, nombre = 5): void => {
  while (nombre--) {
    gouttes.push({
      vitesseX: Math.random() * 4 - 2,
      vitesseY: Math.random() * -4,
      X,
      Y,
      radius: 1 + Math.floor(Math.random() * 3),
      alpha: 1,
      couleur,
    });
  }
};

const update = (): void => {
  particules = particules.filter((particle) => {
    particle.X += particle.vitesseX;
    particle.Y += particle.vitesseY + 5;
    if (particle.Y > height - 15) {
      explosion(particle.X, particle.Y, particle.couleur);
      return false;
    }
    return true;
  });

  gouttes = gouttes.filter((drop) => {
    drop.X += drop.vitesseX;
    drop.Y += drop.vitesseY;
    drop.radius -= 0.075;
    drop.alpha = Math.max(0, drop.alpha - 0.005);
    return drop.radius > 0;
  });

  for (let i = 0; i < controls.rain; i++) {
    Rain(Math.floor(Math.random() * width), -15);
  }
};

const rendu = (ctx: CanvasRenderingContext2D): void => {
  ctx.save();
  ctx.clearRect(0, 0, width, height);

  particules.forEach((particle) => {
    ctx.globalAlpha = particle.alpha;
    ctx.fillStyle = particle.couleur;
    ctx.fillRect(particle.X, particle.Y, particle.vitesseY / 4, particle.vitesseY);
  });

  gouttes.forEach((drop) => {
    ctx.globalAlpha = drop.alpha;
    ctx.fillStyle = drop.couleur;
    ctx.beginPath();
    ctx.arc(drop.X, drop.Y, drop.radius, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
};

const animate = (): void => {
  requestAnimFrame(animate);
  if (ctx) {
    update();
    rendu(ctx);
  }
};

const initCanvas = (): void => {
  if (canvas.value) {
    ctx = canvas.value.getContext('2d');
    if (ctx) {
      width = canvas.value.width = window.innerWidth;
      height = canvas.value.height = window.innerHeight;

      window.onresize = () => {
        if (canvas.value) {
          width = canvas.value.width = window.innerWidth;
          height = canvas.value.height = window.innerHeight;
        }
      };

      window.onmousemove = (event) => {
        mouse.X = event.clientX;
        mouse.Y = event.clientY;
      };

      animate();
    }
  }
};

const cleanupCanvas = (): void => {
  particules = [];
  gouttes = [];
  if (ctx) {
    ctx.clearRect(0, 0, width, height);
  }
};

onMounted(() => {
  initCanvas();
});

onBeforeUnmount(() => {
  cleanupCanvas();
});

watch(isRain, (newVal) => {
  controls.rain = newVal ? 12 : 0;
});
</script>


<template>
  <canvas ref="canvas" style="position: absolute; top: 0; left: 0;"></canvas>

  <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
  <div class="containerr h-[100dvh] w-[100dvw]">

    <header class="header">

      <input type="checkbox" id="check">
      <label for="check" class="icons">
        <i class='bx bx-menu' id="menu-icon"></i>
        <i class='bx bx-x' id="close-icon"></i>
      </label>

      <nav class="navbar flex flex-col float-right md:flex-row mr-5 mt-5 md:space-x-4">
        <a>
          <router-link style="--i:0" to="listing" class="asd text-white hover:underline">Megtekintés</router-link>
        </a>
        <a>
          <router-link style="--i:1" to="login" class="text-white hover:underline">Bejelentkezés</router-link>
        </a>
        <a>
          <router-link style="--i:2" to="admin" class="text-white hover:underline">Admin</router-link>
        </a>
      </nav>

    </header>

    <div class="fixed-bottom-right">
      <button class="rain-button" @click="toggleRain"><img src="../../../public/assets/cloud-icon.png"
          alt="Button Image" /></button>
    </div>

  </div>

  <div class="flex justify-end " id="rightSide">
    <div class="fixed-bottom-left font-semibold">
      <h1>Pollák</h1>
      <h1>Classroom</h1>
    </div>
  </div>
</template>

<style scoped>
.rain-button {
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}

.rain-button img {
  width: 7vw;
  height: 7vw;
  display: block;
}

.fixed-bottom-right {
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 3%;
  color: black;
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
  color: rgb(0, 0, 0);
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

@media (max-width: 992px) {
  .header {
    padding: 1.3rem 5%;
  }
}

@media (max-width: 910px) {
  .icons {
    display: inline-flex;
  }

  #check:checked~.icons #menu-icon {
    display: none;
  }

  .icons #close-icon {
    display: none;
  }

  #check:checked~.icons #close-icon {
    display: block;
  }

  .navbar {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  #check:checked~.navbar {
    height: 13.8rem;
  }

  .navbar a {
    display: block;
    font-size: 1.1rem;
    margin: .3rem 0;
    text-align: center;
    opacity: 0;
    transform: translateY(-50px);
    transition: all 0.13s ease;
  }

  #check:checked~.navbar a {
    transform: translateY(0);
    opacity: 12;
    transition-delay: calc(.1s * var(--i));
  }

}

.fixed-bottom-left {
  position: fixed;
  bottom: 0;
  left: 0;
  margin: 3%;
}

h1 {
  font-size: 17vh;
  font-family: Verdana;
  margin: 0;
  line-height: 1;
  transition: 0.3s;
  color: #000000;
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
</style>