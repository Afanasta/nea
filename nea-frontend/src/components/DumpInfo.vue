<script setup>
import UIButton from "@/components/UI/UIButton.vue";
import {ref, watch} from "vue";

const emit = defineEmits(['customChange'])

let urls = ref([])

function getFormValues (submitEvent) {
  emit('customChange', {
    event: submitEvent.target.elements,
    callback: () => {
      urls.value = []
    }
  })
}

function renderImages(e) {
  urls.value = []
  const files = e.target.files;
  for (const key of Object.keys(files)) {
    urls.value.push(URL.createObjectURL(files[key]))
  }
}

</script>

<template>
  <form class="dump_info" @submit.prevent="(e) => getFormValues(e)">
    <p class="header-text">ОСТАВЬТЕ ИНФОРМАЦИЮ О ТОЧКЕ</p>
    <div class="dump_info_editor">
      <textarea
          name="text"
          placeholder="Введите Ваш комментарий..."
          class="dump_info_editor__textarea"
          />
      <div class="dump_info_editor__image">
        <div
            class="dump_info_editor__image_wrapper"
            v-if="urls.length"
        >
          <img
              class="dump_info_editor__image__preview"
              v-for="url in urls"
              :src="url"
              alt="preview"
          >
        </div>
        <template v-else>
          <img class="dump_info_editor__image__icon" src="@/assets/icons/add-img.png" alt="add-img">
          Максимальный размер файла 10 МБ
        </template>
        <label class="dump_info_editor__image_update" for="input-file">
          <input
              id="input-file"
              type="file"
              alt="image"
              accept="image/x-png, image/jpeg"
              multiple="multiple"
              name="images"
              @change="(e) => renderImages(e)"
          />
        </label>
      </div>
    </div>
    <div class="dump_info_button">
      <UIButton text="Отправить"/>
    </div>
  </form>
</template>

<style lang="scss">
@import "@/assets/styles/main";

.dump_info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  text-align: center;
  background: $base;
  min-width: 80%;
  height: auto;
  padding: 3rem 2rem;
  margin: 10% 0;

  &_editor {
    width: 100%;
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2%;
    height: 15rem;

    &__textarea {
      font-size: 1rem;
      width: 80%;
      color: $accent-main;
      min-height: 15rem;
      border: 0.1rem dashed $accent-main;
      border-radius: 2rem;
      padding: 5%;
      outline: none;
      font-family: 'Roboto', sans-serif;
      resize: none;

      &::placeholder {
        font-size: 1rem;
        color: $accent-main;
        font-family: 'Roboto', sans-serif;
      }
    }

    &__image {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: 0.1rem dashed $accent-main;
      height: 15rem;
      border-radius: 2rem;
      opacity: 0.8;
      cursor: pointer;
      position: relative;
      width: 15rem;

      &_wrapper {
        display:flex;
        flex-wrap:wrap;
        align-items: center;
        justify-content: center;
      }

      &__preview {
        width:25%;
      }
    }
  }

  &_button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
}

input[type="file"] {
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

@media (min-width: 500px) {
  .dump_info {
    gap: 1rem;

    &_editor {
      height: 100%;
      &__textarea {
        height: 100%;
        font-size: 1.5rem;

        &::placeholder {
          font-size: 1.5rem;
        }
      }
    }
    &_button {
      width: 30%;
    }
  }
}

@media (min-width: 992px) {
  .dump_info {
    gap: 2rem;

    &_editor {
      &__textarea {
        font-size: 2.3rem;

        &::placeholder {
          font-size: 2.3rem;
        }
      }
    }
    &_button {
      width: 30%;
    }
  }
}

@media (min-width: 1200px) {
  .dump_info {
    gap: 2rem;

    &_editor {
      &__textarea {
        font-size: 2.3rem;

        &::placeholder {
          font-size: 2.3rem;
        }
      }
    }
    &_button {
      width: 40%;
    }
  }
}

@media (min-width: 1500px) {
  .dump_info {
    gap: 3rem;

    &_editor {
      padding: 0 15%;
      &__textarea {
        font-size: 2.3rem;

        &::placeholder {
          font-size: 2.3rem;
        }
      }

    }
    &_button {
      width: 20%;
    }
  }
}
</style>