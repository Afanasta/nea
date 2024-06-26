<script setup>
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {loadPublicationById} from "@/plugins/axios.js";
import {formatSimpleDate} from "@/helper/dateTime.js";
import articleIcon from "@/assets/icons/articles.png";
import eventIcon from "@/assets/icons/people-group.png";
import newsIcon from "@/assets/icons/news.png";
import projectIcon from "@/assets/icons/academy-cap.png";

const title = ref('')
const content = ref('')
const date = ref(new Date())
const type = ref(4)

function getIconForPost(type) {
  switch (type) {
    case 'ARTICLE': {
      return articleIcon
    }
    case 'EVENT': {
      return eventIcon
    }
    case 'NEWS': {
      return newsIcon
    }
    case 'PROJECT': {
      return projectIcon
    }
  }
}

onMounted(async () => {
  const route = useRoute();

  const publicationId = route.params.id;

  const publication = await loadPublicationById(publicationId);
  content.value = publication.content
  title.value = publication.title
  date.value = publication.createdAt
  type.value = publication.type.type
})
</script>

<template>
  <div class="account">
    <div class="post_header">
      <div style="display: flex; gap: 10px">
      <div class="post_header_title">
        <p class="small-header">{{ title }}</p>
      </div>
      <div style="display: flex; justify-content: center; align-items: center">
        <img
            class="header-icon"
            :src="getIconForPost(type)"
            :alt="type">
      </div>
      </div>
      <p class="highlight-text">{{ formatSimpleDate(new Date(date)) }}</p>
    </div>
    <div class="post_template">
      <p class="plain-text clamp-text" v-html="content"></p>
    </div>
    <div class="post_date">

    </div>
  </div>
</template>

<style scoped lang="scss">
.account {
  padding: 15% 20%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex-grow: 1;
}
</style>