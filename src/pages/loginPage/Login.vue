<template>
  <div class="view-page" v-if="isSizeCompatible">
    <div class="containerr">
      <RouterLink to="/">
        <Button icon="pi pi-arrow-left" class="custom-button" aria-label="Back"/>
      </RouterLink>
      <div class="login-box">
        <h2>Bejelentkezés</h2>
        <form @submit.prevent="handleLogin">
          <div class="user-box">
            <input type="text" v-model="email" required=""/>
            <label>Felhasználónév</label>
          </div>
          <div class="line1"></div>
          <div class="user-box">
            <input type="password" v-model="password" required=""/>
            <label>Jelszó</label>
          </div>
          <div class="line"></div>
          <a
              href="#"
              :class="['submit', { disabled: !isFormValid }]"
              :disabled="!isFormValid"
              @click="isFormValid && handleLogin"
          >
            Belépés
          </a>
          <router-link to="/listing">
            <div class="folytdiv"><a class="folyt">Folytatás bejelentkezés nélkül</a></div>
          </router-link>
        </form>
      </div>
    </div>
  </div>
  <div class="size-error" v-else>
    <p>Ekkora méretben az oldal nem megtekinthető</p>
  </div>
</template>

<script>
document.title = "EduCloud | Bejelentkezés";

export default {
  data() {
    return {
      email: '',
      password: '',
      isSizeCompatible: true
    };
  },
  computed: {
    isFormValid() {
      return this.email.length > 0 && this.password.length > 0;
    }
  },
  methods: {
    handleLogin() {
      console.log('Email:', this.email);
      console.log('Jelszó:', this.password);
    },
    checkWindowSize() {
      this.isSizeCompatible = window.innerWidth >= 344 && window.innerHeight >= 470;
    }
  },
  mounted() {
    this.checkWindowSize();

    window.addEventListener('resize', this.checkWindowSize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkWindowSize);
  }
};
</script>

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
  color: var(--text-color)
}

html {
  height: 100%;
}

.custom-button {
  font-size: 18px;
  padding: 20px 20px;
  width: auto;
  height: 50px;
  cursor: pointer;
}

.containerr {
  height: 100dvh;
  background-size: cover;
  mix-blend-mode: var(--_mesh-gradient-blend-mode);
}

@media (max-width: 768px) {
  .containerr {
    background-size: cover;
  }
}

@media (max-width: 480px) {
  .containerr {
    background-position: top;
    background-size: contain;
  }
}

@media (max-width: 380px) {
  .login-box {
    height: 380px;
  }
}


.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80dvw;
  max-width: 400px;
  height: 420px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.726);
  box-sizing: border-box;
  box-shadow: 0 13px 25px 3px rgba(0, 0, 0, 0.822),
  inset 0 2px 15px #000000;
  border-radius: 23px;
  backdrop-filter: blur(15px);
}

.login-box h2 {
  margin: 10px auto 35px auto;
  padding: max(1dvh, 8px) 0;
  color: #fff;
  text-align: center;
  font-size: min(8vw, 40px);
  transition: .3s;
  max-width: 300px;
  height: 60px;
}

.login-box .user-box {
  text-align: center;
  position: relative;
  top: min(3vh, 20px);
  width: 60dvw;
  max-width: 300px;
}

.login-box .user-box input {
  width: 60dvw;
  max-width: 298px;
  padding: 10px 0;
  font-size: 16px;
  color: #ffffff;
  margin-bottom: 30px;
  border: none;
  outline: none;
  background: transparent;
}

.line {
  width: 60dvw;
  max-width: 300px;
  margin-bottom: 30px;
  border: none;
  border-bottom: 2px solid #CD90FB;
  outline: none;
  position: absolute;
  bottom: 116px;
  box-shadow: 0px 4px 20px 2px #000000;
}

.line1 {
  width: 60dvw;
  max-width: 300px;
  margin-bottom: 30px;
  border: none;
  border-bottom: 2px solid #CD90FB;
  outline: none;
  position: absolute;
  bottom: 190px;
  box-shadow: 0px 4px 20px 2px #000000;
}

.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 5px;
  font-size: 16px;
  color: #785AEE;
  pointer-events: none;
  transition: .3s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -16px;
  left: 0;
  color: #785AEE;
  font-size: 12px;
  padding: 10px 0px;
}

.login-box form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.submit {
  background-color: #CD90FB;
  color: rgb(0, 0, 0);
  border: none;
  cursor: pointer;
  transition: background-color 0.4s;
}

.submit.disabled {
  cursor: not-allowed;
  opacity: 0;
  pointer-events: none;
  transition: none;
}

.submit.disabled span {
  display: none;
}

.login-box form .submit {
  position: relative;
  padding: 12px 28px;
  font-size: 16px;
  text-decoration: none;
  transition: .5s;
  letter-spacing: 3px;
  font-weight: bolder;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.26);
  box-shadow: 0px 3px 10px 0px #000000bb;
  margin-bottom: 10px;
  display: inline-block;
  text-align: center;
  width: 140px;
  animation: shadows 1.7s infinite;
}

@keyframes shadows {
  0% {
    box-shadow: 0px 0px 50px 1px #CD90FB;
  }
  50% {
    box-shadow: 0px 0px 40px 1px rgba(94, 94, 94, 0.5);
  }
  100% {
    box-shadow: 0px 0px 50px 1px #CD90FB;
  }
}

.login-box form .submit:hover {
  width: 300px;
  background: #CD90FB;
  color: black;
  border: 1px solid rgba(255, 255, 255, 0);
  animation: none;
  box-shadow: 0 0 5px #CD90FB,
  0 0 25px #CD90FB,
  0 0 50px #CD90FB,
  0 0 100px #CD90FB;
}

.folytdiv {
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
}

.folyt {
  text-decoration: underline;
  font-size: 13px;
  color: #fff;
  display: block;
  text-align: center;
}

</style>
  
