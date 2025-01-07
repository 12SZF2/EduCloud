<script setup lang="ts">
const navigateToPage = (url: string) => {
  window.location.href = url;
};
</script>
<template>
  <section id="tranding">
    <h1 class="text-center section-heading">Szakmák</h1>
    <div class="container">
      <!-- Kártyák -->
      <a href="/szoftverfejleszto" class="card">
        <div class="images" id="szf">
          <div class="card-content">
            <h2 class="szakma-name">Szoftverfejlesztő és -tesztelő</h2>
          </div>
        </div>
      </a>

      <a href="/Elektro Technikus" class="card">
        <div class="images" id="autoT">
        <div class="card-content">
          <h2 class="szakma-name">Elektro Technikus</h2>
        </div>
      </div>
      </a>

      <a href="/Automatikai Technikus" class="card">
        <div class="images" id="webf">
        <div class="card-content">
          <h2 class="szakma-name">Automatikai Technikus</h2>
        </div>
      </div>
      </a>

      <a href="/Rendszerüzemeltető" class="card">
        <div class="images" id="redszerg">
        <div class="card-content">
          <h2 class="szakma-name">Rendszerüzemeltető</h2>
        </div>
      </div>
      </a>

      <a href="/Közismeret" class="card">
        <div class="images" id="asd">
        <div class="card-content">
          <h2 class="szakma-name">Közismeret</h2>
        </div>
      </div>
      </a>
    </div>
  </section>
</template>

<style scoped>
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

h2{
  color: white;
}

.container {
  max-width: 100%;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column; 
  gap: 2rem; 
  overflow-y: auto; 
  max-width: 600px; 
  height: auto; 
}

.card {
  display: flex;
  flex-direction: row; 
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 10px 30px rgb(0, 0, 0);
  background-color: rgba(255, 255, 255, 0.219);
  backdrop-filter: blur(50px);
  width: 100%; 
  height: 15rem;
}

.images {
  flex: 1; 
  height: 100%;
}

#szf {
  background-image: url("../../imgs/szoftver.jpg");
  background-size: cover;
  background-position: center;
}

#autoT {
  background-image: url("../../imgs/elektro.jpg");
  background-size: cover;
  background-position: center;
}

#webf {
  background-image: url("../../imgs/automatikaitechnikus.jpg");
  background-size: cover;
  background-position: center;
}

#redszerg {
  background-image: url("../../imgs/rendszeruzemelteto.jpg");
  background-size: cover;
  background-position: center;
}

#asd {
  background-image: url("../../imgs/kozismeret.jpg");
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
  background: rgb(0,0,0);
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.301) 0%, rgba(0,0,0,1) 76%);
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
  font-size: 1.8rem;
  font-weight: bold;
}

.button-container {
  margin-top: 1rem;
}
.section-heading {
  font-size: 3rem;
  color: #ff5825ea;
  padding-bottom: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
}

@media (max-width: 768px) {
  .card {
    flex-direction: column; /* Mobil nézetben a kártyák egy oszlopba kerülnek */
  }

  .images {
    width: 100%;
    height: auto;
  }

  .card-content {
    width: 100%;
  }
}
</style>
