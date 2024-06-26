<script setup>
import {ref} from "vue"

let openClass = ref(false)

const toggleMenu = () => {
  openClass.value = !openClass.value
}

window.addEventListener('resize', () => {
  openClass.value = false
})
</script>

<template>
  <div class="menu-icon" @click="toggleMenu()" :class="{open : openClass}">
    <span class="nav-icon__burger1"></span>
    <span class="nav-icon__burger2"></span>
  </div>
</template>


<style lang="scss">
@import "@/assets/styles/main";
.menu-icon {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all .5s ease-in-out;
}

.nav-icon__burger1 {
  width: 2rem;
  height: 0.2rem;
  background: $primary3;
  border-radius: 1rem;
  transition: all .3s ease-in-out;
}

.nav-icon__burger2 {
  width: 2rem;
  height: 0.2rem;
  background: $primary3;
  border-radius: 1rem;
  transition: all .3s ease-in-out;
}


.menu-icon.open .nav-icon__burger1 {
  transform: rotate(-45deg);
}

.menu-icon.open .nav-icon__burger2 {
  transform: rotate(45deg) translate(-0.4rem, -0.4rem);
}
</style>