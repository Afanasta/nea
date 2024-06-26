<template>
  <div class="nca">
    <div class="header-container">
      <img
          class="header-icon"
          src="@/assets/icons/academy-cap.png" alt="academy">
      <p class="header-text">АНО "НИСИ"</p>
    </div>
    <div style="display: flex; justify-content: center; align-items: center">
      <img
          style="width: 50%"
          src="../assets/images/nisi.jpg"
          alt="">
    </div>
    <p class="plain-text"> В целях решения вопросов экологии сложных систем, в 2023 году в рамках РОО «Новосибирская
      экологическая академия» был создан и приступил к работе «Новосибирский институт системных исследований».
    </p>
    <p class="plain-text"> РОО «НЭА», совместно с НИСИ провели сложную аэрокосмическую экспертизу земель Убинского
      района Новосибирской области в целях определения экологического состояния земель района и установления категорий
      земель пригодных под сельхозпроизводство.
    </p>
  </div>
</template>

<script setup>

</script>

<style lang="scss">

.nca {
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 3rem;
  padding: 20% 2rem;
}

@media (min-width: 500px) {
  .nca {
    gap: 3rem;
    padding: 16% 5rem;
    flex-grow: 1;
  }
}

@media (min-width: 992px) {
  .nca {
    gap: 4rem;
    padding: 12% 10%;
  }
}

@media (min-width: 1200px) {
  .nca {
    gap: 5rem;
    padding: 10rem 15%;
  }

  @media (min-width: 1500px) {
    .nca {
      gap: 5rem;
      padding: 12rem 15%;
    }
  }
}
</style>