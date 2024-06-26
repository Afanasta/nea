<script setup>
import {RouterView} from 'vue-router';
import Header from "@/components/LayoutElements/Header.vue";
import Footer from "@/components/LayoutElements/Footer.vue";
import Modal from "@/components/LayoutElements/Modal.vue";

import {useUserStore} from "@/store/index.js";
import {storeToRefs} from "pinia";

const store = useUserStore();

const {
  isMessageActive,
  getMessage
} = storeToRefs(store)

</script>

<template>
  <Header/>
  <RouterView/>
  <Modal
      v-if="isMessageActive"
      :message="getMessage"
  />
  <Footer/>
</template>

