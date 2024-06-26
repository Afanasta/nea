<template>
  <form @submit.prevent="sendEmail" class="contact">
    <div class="header-container">
      <img
          class="header-icon"
          src="@/assets/icons/academy-cap.png" alt="academy">
      <p class="header-text">Сотрудничество</p>
    </div>

    <div class="contact_info">
      <div class="small-header">Почта: <p class="highlight-text">nsk.ecoakademy@gmail.com</p></div>
      <div class="small-header">Юридический адрес: <p class="highlight-text">Новосибирская область, Новосибирский р-н, рп Краснообск, ул. Восточная, зд. 22/7, помещ. 8</p></div>
    </div>

    <div class="contact_form">
      <p class="contact_form_header header-text">Связаться с нами</p>
      <input class="contact_form_input" v-model="name" type="text" placeholder="Имя" required>
      <div class="line"/>
      <input class="contact_form_input" v-model="email" type="email" placeholder="Электронная почта" required>
      <div class="line"/>
      <textarea class="contact_form_input" v-model="message" placeholder="Комментарий"/>
      <div class="line"/>
      <UIButton
          text="Отправить"
          @click="() => sendEmail()"
      />
    </div>
  </form>
</template>

<script setup>
import {onMounted, ref} from "vue";
import UIButton from "@/components/UI/UIButton.vue";
import {boundMail} from "@/plugins/axios.js";

onMounted(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  })
})

const name = ref('')
const email = ref('')
const message = ref('')

async function sendEmail() {
    const payload = {
      name: name.value,
      email: email.value,
      message: message.value,
    };
    await boundMail(payload);
}

</script>

<style lang="scss">
@import "@/assets/styles/main";

.contact {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20% 7%;

  &_form {
    background-color: $accent-light-green;
    border-radius: 1.5rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
    padding: 5%;

    &_header {
      padding-bottom: 2rem;
    }

    &_input {
      background: transparent;
      all: unset;
      font-size: 1.4rem;
    }
  }

  &_info {
    padding: 2rem 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}

.line {
  width: 100%;
  height: 1px;
  margin-bottom: 5.2rem;
  background-color: $accent-main;
}

textarea {
  background: transparent;
  outline: none;
  border: none;
  font-size: 2rem;
  width: 100%;
  min-height: 18.9rem;
  height: auto;
  padding-top: 2%;
}

::-webkit-input-placeholder {
  font-size: 1.4rem;
}


@media (min-width: 500px) {
  .contact {
    padding: 8rem 10% 7% 10%;
  }
}

@media (min-width: 992px) {
  .contact {
    padding: 10rem 10% 7% 10%;
  }
}

@media (min-width: 1200px) {
  .contact {
    padding: 10rem 20% 7% 20%;

      &_form {
        width: 60%;
      }

      &_data {
        width: 50%;
      }
    }
  }

@media (min-width: 1500px) {
  .contact {
    padding: 12rem 20% 7% 20%;

    &_form {
      width: 60%;
    }

    &_data {
      width: 50%;
    }
  }
}

</style>