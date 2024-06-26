<script setup>
import UIButton from "@/components/UI/UIButton.vue";
import {onMounted, ref} from "vue";
import {useUserStore} from "@/store/index.js";
import {storeToRefs} from "pinia";
import UIInput from "@/components/UI/UIInput.vue";
import {useCookies} from "vue3-cookies";
import router from "@/router/index.js";
import {connect, subscribeToMail, updatePassword} from "@/plugins/axios.js";

const store = useUserStore()

const {
  isUserAuth
} = storeToRefs(store)

const {cookies} = useCookies()

function logout() {
  store.logout();
  cookies.remove('accessToken', '/', '.nsk-ecoacademy.ru')
  router.push('/');
}

const oldPassword = ref('')
const newPassword = ref('')
const repeatNewPassword = ref('')

function validateAndUpdatePassword() {
  if (newPassword.value.trim() === '' || repeatNewPassword.value.trim() === '') {
    store.updateMessage('Введите новый пароль!', null);
    return;
  }
  if (repeatNewPassword.value !== newPassword.value) {
    store.updateMessage('Пароли не совпадают!', null);
    return;
  }
  updatePassword(oldPassword.value, newPassword.value)
}

onMounted(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  })
})
</script>

<template>
  <div class="account" v-if="isUserAuth">
    <div class="header-container">
      <img
          class="header-icon"
          src="@/assets/icons/academy-cap.png" alt="academy">
      <p class="header-text">Изменить пароль</p>
    </div>

    <UIInput
        class="authorization_input"
        v-model="oldPassword"
        icon="password" type="password"
        placeholder="Введите текущий пароль..."
        alt="password"/>
    <UIInput
        class="authorization_input"
        v-model="newPassword"
        icon="password"
        type="password"
        placeholder="Введите новый пароль..."
        alt="password"/>
    <UIInput
        class="authorization_input"
        v-model="repeatNewPassword"
        icon="password"
        type="password"
        placeholder="Повторите новый пароль..."
        alt="password"/>

    <div class="account__button">
      <UIButton
          text="Сохранить"
          @click="() => validateAndUpdatePassword()"
      />
    </div>

    <div class="account_only-user">
      <div class="header-container">
        <img
            class="header-icon"
            src="@/assets/icons/academy-cap.png" alt="academy">
        <p class="header-text">Стать одним из нас</p>
      </div>

      <div class="account__button">
        <UIButton
            @click="() => connect()"
            text="Оставить заявку"/>
      </div>
    </div>

      <div class="account_only-user">
        <div class="header-container">
          <img
              class="header-icon"
              src="@/assets/icons/articles.png" alt="articles">
          <p class="header-text">Получать новостную рассылку</p>
        </div>

      <div class="account__button">
        <UIButton
            text="Подписаться"
            @click="() => subscribeToMail()"
        />
      </div>
    </div>
    <div class="account__button">
      <UIButton text="Выйти" @click="() => logout()"/>
    </div>

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