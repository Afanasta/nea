<script setup>
import {ref} from "vue";
import BurgerMenu from "@/components/BurgerMenu.vue";
import UIInput from "@/components/UI/UIInput.vue";
import {useUserStore} from "@/store/index.js";
import router from "@/router/index.js";

const isMenu = ref(false);

const store = useUserStore();

function getLink() {
  return store.isUserAuth ? '/account' : '/login';
}

const searchText = ref('')

function handleSearch(event) {
  if (event.key === 'Enter') {
    router.push({
      path: '/news',
      query: {
        text: searchText.value
      }
    })
    searchText.value = ''
  }
}

window.addEventListener('resize', () => {
  if (window.innerWidth >= 500) {
    return isMenu.value = false
  }
})
</script>

<template>
  <header class="header">
    <div class="header_company-info">
      <RouterLink to="/">
        <img
            class="header_company-info__logo"
            src="../../assets/icons/logo.png" alt="logo">
      </RouterLink>
    </div>

    <div class="header_menu_links__desktop">
      <RouterLink to="/about" class="menu_links__desktop__link">О нас</RouterLink>
      <RouterLink to="/news" class="menu_links__desktop__link">Новости</RouterLink>
      <RouterLink to="/projects" class="menu_links__desktop__link">Проекты</RouterLink>
      <RouterLink to="/nca" class="menu_links__desktop__link">АНО "НИСИ"</RouterLink>
      <RouterLink to="/contact" class="menu_links__desktop__link">Сотрудничество</RouterLink>
    </div>

    <BurgerMenu class="header_center-menu" @click="isMenu = !isMenu"/>

    <div class="header_right-panel">
      <UIInput
          type="search"
          icon="search"
          alt="search"
          placeholder="Найти..."
          v-model="searchText"
          @keydown="(e) => handleSearch(e)"
      />
      <RouterLink
          :to="getLink()"
          class="header_right-panel__button">
        <img
            src="@/assets/icons/user.png"
            alt="search"
            class="icon-input">
      </RouterLink>
    </div>

    <div class="header_menu_links" v-if="isMenu">
      <RouterLink to="/about">О нас</RouterLink>
      <RouterLink to="/news">Новости</RouterLink>
      <RouterLink to="/projects">Проекты</RouterLink>
      <RouterLink to="/nca">АНО "НИСИ"</RouterLink>
      <RouterLink to="/contact">Сотрудничество</RouterLink>
    </div>

  </header>
</template>


<style lang="scss">
@import "@/assets/styles/main";
.menu_links__desktop__link {
  color: $text-main
}

.header {
  position: fixed;
  top: 0;
  background-color: $white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3%;
  padding: 3% 5%;
  z-index: 2;
  width: 100%;
  height: 7%;

  &_company-info {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    &__logo {
      height: 4rem;
    }
  }

  &_menu_links {
    display: flex;
    justify-content: center;
    gap: 1rem;
    position: absolute;
    font-size: 1.2rem;
    font-weight: bold;
    top: 100%;

    background-color: $white;
    color: $text-main;
    width: 100%;
    left: 0;
    padding: 2rem 0;
    animation: appear .5s forwards;
  }

  &_menu_links__desktop {
    display: none;
  }

  &_right-panel {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;

    &__button {
      height: 100%;
      width: 15%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: .75rem 1.25rem;
      border-radius: 50%;
      color: #fff;
      text-transform: uppercase;
      font-size: 1rem;
      letter-spacing: .15rem;
      transition: all .3s;
      position: relative;
      overflow: hidden;
      z-index: 1;

      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: transparent;
        border-radius: 50%;
        z-index: -2;
      }

      &:before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 100%;
        background-color: lighten($accent-light, 20%);
        transition: all .3s;
        border-radius: 50%;
        z-index: -1;
      }

      &:hover {
        color: #fff;

        &:before {
          width: 100%;
        }
      }
    }
  }
}

@media (min-width: 500px) {
  .header {
    padding: 2% 4%;
    height: 6rem;

    &_menu_links {
      font-size: 1.5rem;
      gap: 2rem;
    }

    &_right-panel {
      &__button {
        width: 13%;
      }
    }
  }
}

@media (min-width: 992px) {
  .header {
    padding: 1% 5%;

    &_menu_links {
      font-size: 2.5rem;
      gap:5rem;
    }
  }
}

@media (min-width: 1200px) {
  .header {
    height: 8rem;

    &_menu_links {
     display: none;
    }

    &_center-menu {
      display: none;
    }
    &_company-info {
      &__logo {
        height: 6rem;
      }
    }

    &_right-panel {
      justify-content: right;
    }

      &_menu_links__desktop {
        display: flex;
        gap: 2.5rem;
        font-size: 2.5rem;
        font-family: 'Roboto Condensed', sans-serif;
      }

  }
}

@media (min-width: 1600px) {
  .header {
    padding: 1% 13%;

    &_right-panel {
      padding: 0;
      justify-content: right;

    }

    &_menu_links__desktop {
      gap: 3rem;
      font-size: 2rem;
    }
  }
}

@keyframes appear {
  0% {
    transform: translateY(-.9rem);
  }
  100% {
    transform: translateY(0);
  }
}
</style>