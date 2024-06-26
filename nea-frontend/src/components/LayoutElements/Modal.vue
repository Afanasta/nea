<script setup>
import UIButton from "@/components/UI/UIButton.vue";
import {useUserStore} from "@/store/index.js";

defineProps({
  message: {
    type: String,
    required: true,
  }
});

const store = useUserStore();

</script>

<template>
<div class="modal">
  <div class="modal_wrap">
    <div class="modal_window">
      <h1 class="modal_header">Уведомление</h1>
      <div class="modal_message">{{message}}</div>
      <UIButton
        @click="() => store.clearMessage()"
        text="OK"
      />
    </div>
  </div>
</div>
</template>

<style lang="scss">
.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  overflow: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  z-index: 99;
  padding:30px 0;
}

.modal {
  &_wrap {
    flex-shrink: 0;
    flex-grow: 0;
    width: 100%;
    min-height: 100%;
    margin: auto;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
  }

  &_window {
    text-align: center;
    margin: 50px 0;
    flex-shrink: 0;
    flex-grow: 0;
    background: #fff;
    width: 600px;
    max-width: 100%;
    overflow: visible;
    transition: transform 0.2s ease 0s, opacity 0.2s ease 0s;
    transform: scale(0.9);
    opacity: 1;

    box-shadow: 0 1px 3px 0 #1D3538FF;
    border-radius: 15px;
    padding: 20px;

  }

  &_message {
    font-size: 2rem;
    padding: 20px 0;
  }

  &_header {
    font-size: 3rem;
  }
}
</style>
