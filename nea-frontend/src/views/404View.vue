<template>
  <div class="not-found">
    <img src="@/assets/images/404.png" alt="404" class="not-found_image">
    <p class="header-text">Такой страницы не существует</p>
  </div>
</template>

<script setup>

</script>

<style lang="scss">
.not-found {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1% 0 2% 0;

  &_image {
    width: 100%;
  }
}


@media (min-width: 992px) {
  .not-found {
    &_image {
      width: 60%;
    }
  }
}
</style>