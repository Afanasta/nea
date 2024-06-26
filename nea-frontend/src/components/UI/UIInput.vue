<template>
  <div class="input_container">
    <img v-if="props.icon"
        class="icon-input"
        :src="getImageUrl(props.icon)"
        :alt="props.alt"
    >
    <input
        :value="modelValue"
        :type="props.type"
        :placeholder="props.placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
        autocomplete="new-password"
    >
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {type: String},
  type: {type: String},
  placeholder: {type: String},
  icon: {type: String},
  alt: {type: String},
})

const getImageUrl = (path) => {
  return new URL(`../../assets/icons/${path}.png`, import.meta.url).href;
};
</script>

<style lang="scss">
</style>