<script setup>
import articleIcon from '../assets/icons/articles.png'
import newsIcon from '../assets/icons/news.png'
import projectIcon from '../assets/icons/academy-cap.png'
import eventIcon from '../assets/icons/people-group.png'
import {formatSimpleDate} from "../helper/dateTime.js";
import router from "@/router/index.js";

const props = defineProps({
  id: {type: Number},
  title: {type: String},
  content: {type: String},
  type: {type: String},
  createdAt: {type: Date},
  isShortened: {type: Boolean}
})

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
</script>

<template>
  <div class="post">
    <div class="post_header" @click="() => router.push(`/news/${id}`)">
      <div class="post_header_title">
        <p class="small-header">{{title}}</p>
      </div>
      <img
          class="header-icon"
          :src="getIconForPost(type)"
          :alt="type">
    </div>
    <div class="post_template">
      <p class="plain-text clamp-text" v-html="content"></p>
    </div>
    <div class="post_date">
      <p class="highlight-text">{{ formatSimpleDate(new Date(createdAt)) }}</p>
    </div>
  </div>
</template>


<style lang="scss">
@import "src/assets/styles/main";

.post {
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 1px 3px 0 $text-main;
  margin: 10px 0;
  width: 100%;

  &_date {
    padding-top: 10px;
  }

  &_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: .5rem;
    padding-bottom: 2rem;

    &_title {
      display: flex;
      justify-content: start;
      gap: .5rem;
    }
  }

  &_template {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    gap: 3rem;
    width: 100%;

    &_image_container {
      width: 50%;
      border-radius: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem;

      &_image {
        width: 100%;
      }
    }
  }
}

@media (min-width: 500px) {
  .post {
    padding-top: 1rem;
    &_template {
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: 3rem;
      width: 100%;


      &_image_container {
        width: 40%;
        padding: 2rem;
      }
    }
  }
}

@media (min-width: 992px) {
  .post {
    &_template {
      gap: 4rem;
      width: 100%;


      &_image_container {
        width: 30%;
        padding: 2rem;
      }
    }
  }
}

@media (min-width: 1200px) {
  .post {
    &_header {
      gap: 1rem;
    }
    &_template {
      gap: 4rem;
      width: 100%;


      &_image_container {
        width: 18%;
        padding: 2rem;
      }
    }
  }
}

</style>