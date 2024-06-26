<script setup>
import Map from "@/components/HomeSections/MapSection.vue";
import PostsSection from "@/components/HomeSections/PostsSection.vue";
import MainSection from "@/components/HomeSections/MainSection.vue";
import {onMounted, ref} from "vue";
import {useUserStore} from "@/store/index.js";

const userStore = useUserStore();

onMounted(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  })
})

</script>

<template>
  <main>
    <MainSection />
    <PostsSection />
    <Map/>
  </main>
</template>
