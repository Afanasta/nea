<script setup>
import {onMounted, ref} from "vue";
import UIButton from "@/components/UI/UIButton.vue";
import {getArticles, getNews} from "@/plugins/axios.js";
import router from "@/router/index.js";
import PostTemplate from "@/components/PostTemplate.vue";

let news = ref([])
let articles = ref([])

onMounted(async () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  news.value = await getNews();
  articles.value = await getArticles();
});
</script>

<template>
  <div class="sections">
      <div class="header-container">
        <p class="header-text">НОВОСТИ</p>
      </div>
      <PostTemplate
          v-for="newsOne in news.slice(0,3)"
          :id="newsOne.id"
          :title="newsOne.title"
          :type="newsOne.type.type"
          :content="newsOne.content"
          :created-at="newsOne.createdAt"
          :is-shortened="true"
      />
      <div class="sections__button">
        <UIButton
            text="читать все"
            @click="() => router.push('/news')"
        />
      </div>

    <div class="header-container">
      <p class="header-text">СТАТЬИ</p>
    </div>
    <PostTemplate
        v-for="article in articles.slice(0,3)"
        :id="article.id"
        :title="article.title"
        :type="article.type.type"
        :content="article.content"
        :created-at="article.createdAt"
        :is-shortened="true"
    />

    <div class="sections__button">
      <UIButton text="читать все" @click="() => router.push('/news')"/>
    </div>
    </div>
</template>

<style lang="scss">
@import "@/assets/styles/main";

.sections {
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 2rem;
  gap: 3rem;

  &__button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
}

@media (min-width: 500px) {
  .sections {
    padding: 3rem 10%;

    &__button {
      padding: 0 30%;
    }
  }
}

@media (min-width: 992px) {
  .sections {
    padding: 3rem 15%;

    &__button {
      padding: 0 35%;
    }
  }
}

@media (min-width: 1200px) {
  .sections {
    padding: 4rem 20%;

    &__button {
      padding: 0 30%;
    }
  }
}

@media (min-width: 1500px) {
  .sections {

    &__button {
      padding: 0 39%;
    }
  }
}
</style>