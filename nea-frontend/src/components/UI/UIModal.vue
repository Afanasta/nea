<template>
  <div class="ui-modal" v-if="props.isModalOpened">
    <div class="ui-modal_backdrop">
      <div class="ui-modal_content">
        <div class="plain-text">{{ props.text }}</div>
        <UIButton @click="closeModal()" :text="props.buttonText"/>
      </div>
    </div>
  </div>
</template>

<script setup>

import UIButton from "@/components/UI/UIButton.vue";

const emit = defineEmits(['closeModal'])
const props = defineProps({
  buttonText: {type: String},
  text: {type: String},
  isModalOpened: {type: Boolean}
})
function closeModal () {
  emit('isModalOpened', false)
}
</script>

<style lang="scss">
.ui-modal {

  &_content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    max-width: 500px;
    margin: 1.75rem auto;
    padding: 20px 30px;
    border-radius: 5px;
    color: #000;
    background-color: #fff;
    transform: translate(0, 0);
    transition: all 0.3s ease;
    box-sizing: border-box;
    gap: 2rem;
  }

  &_backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    transition: opacity 0.3s ease;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

</style>