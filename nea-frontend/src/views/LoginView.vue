<script setup>
import UIButton from "@/components/UI/UIButton.vue";
import UIInput from "@/components/UI/UIInput.vue";
import {ref} from "vue";
import {login} from "@/plugins/axios.js";

const email = ref('')
const password = ref('')

</script>

<template>
  <div class="account">
    <p class="header-text">Авторизация</p>
    <UIInput
        class="authorization_input"
        v-model="email"
        icon="user"
        type="text"
        placeholder="Введите логин..."
        alt="login"/>
    <UIInput
        class="authorization_input"
        v-model="password"
        icon="password"
        type="password"
        placeholder="Введите пароль..."
        alt="password"/>
    <div class="account__button">
      <UIButton
          @click="() => login(email, password)"
          text="Войти"/>
    </div>
    <RouterLink to="/registration">
      <div class="account__button">
        <UIButton
            text="Регистрация"/>
      </div>
    </RouterLink>
  </div>
</template>

<style lang="scss">

.account {
  padding: 20% 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex-grow: 1;

  &_only-user {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

}

@media (min-width: 500px) {
  .account {
    padding: 8rem 7rem;
    gap: 2rem;

    &__button {
      width: 50%;
    }
  }
}

@media (min-width: 992px) {
  .account {
    padding: 10rem 15rem;
    &__button {
      width: 30%;
    }
  }
}

@media (min-width: 1200px) {
  .account {
    padding: 12rem 25rem;
    &_only-user {
      flex-direction: row;
      align-items: center;
      gap: 2rem;
    }

    &__button {
      width: 40%;
    }
  }
}

@media (min-width: 1600px) {
  .account {
    &__button {
      width: 20%;
    }
  }
}
</style>