<script setup>
import PostTemplate from '@/components/PostTemplate.vue'
import {onMounted, ref, watch} from "vue";
import {getPublications, searchPublications} from "@/plugins/axios.js";
import {useRoute} from "vue-router";

let posts = ref([])
const route = useRoute()

onMounted(async () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  if (!route.query.text) {
    posts.value = await getPublications();
  } else {
    posts.value = await searchPublications(route.query.text);
  }
})

watch(() => route.query.text, async(newVal, oldVal) => {
    posts.value = await searchPublications(route.query.text);
})
</script>

<template>
  <div class="posts">
    <div class="posts_sections header-container">
      <p class="header-text">Публикации</p>
    </div>
    <div v-for="post in posts" class="posts_container" :key="post.id">
      <PostTemplate
        :id="post.id"
        :title="post.title"
        :type="post.type.type"
        :content="post.content"
        :created-at="post.createdAt"
      />
    </div>
  </div>
</template>


<style lang="scss">
.posts {
  padding: 20% 8%;
  flex-grow: 1;

  &_container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
}

@media (min-width: 500px) {
  .posts {
    padding: 10rem 10%;
  }
}

@media (min-width: 992px) {
  .posts {
    padding: 10rem 18%;
  }
}

@media (min-width: 1200px) {
  .posts {
    padding: 10rem 15%;
  }
}

@media (min-width: 1500px) {
  .posts {
    padding: 12rem 15%;
  }
}
</style>