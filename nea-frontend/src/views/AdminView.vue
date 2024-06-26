<script setup>
import '@wangeditor/editor/dist/css/style.css';
import UIButton from "@/components/UI/UIButton.vue";
import {onBeforeUnmount, onMounted, ref, shallowRef, watch} from "vue";
import UIInput from "@/components/UI/UIInput.vue";
import {
  approveUserRequest, changeUserType,
  createNewEmployee,
  createPublication,
  deletePublication,
  deleteUser, disapproveUserRequest, getConnectRequest,
  getDumps,
  getPublications,
  getUsers,
  loadPublicationById,
  updatePublication
} from "@/plugins/axios.js";
import {convertRole, formatSimpleDate} from "../helper/dateTime.js";
import {useRoute} from "vue-router";
import router from "@/router/index.js";
import PostTemplate from "@/components/PostTemplate.vue";
import {Editor, Toolbar} from "@wangeditor/editor-for-vue";
import { i18nChangeLanguage } from '@wangeditor/editor';
import SimpleGallery from "@/components/SimpleGallery.vue";

const route = useRoute()

async function createPost() {
  if (route.query.id) {
    await updatePublication(route.query.id, title.value, model.value, Number(type.value), async () => {
      await updateData();
    })
    clearInputs();
  } else {
    await createPublication(title.value, model.value, Number(type.value), async () => {
      await updateData();
    })
    clearInputs();
  }
}

function clearInputs() {
  model.value = ''
  title.value = ''
  currentSection.value = 'PUBLICATIONS'
  router.push('/admin')
}

const dumps = ref([])
const users = ref([])
const publications = ref([])
const requests = ref([])

async function updateData() {
  dumps.value = await getDumps();
  users.value = await getUsers();
  publications.value = await getPublications();
  requests.value = await getConnectRequest();
}

onMounted(async () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  })
  await updateData();
})

const editorRef = shallowRef();

i18nChangeLanguage('en')
const toolbarConfig = {};
const editorConfig = { placeholder: 'Введите текст' };

onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;

  editor.destroy();
});

const handleCreated = (editor) => {
  editorRef.value = editor;
};

const model = ref('')
const title = ref('')
const type = ref(4)
const mode = 'default'

const employeeEmail = ref('')
const employeePassword = ref('')

const currentSection = ref('EDIT')

watch(() => route.query.id, async (newVal, oldVal) => {
  if (route.query.id) {
    const publication = await loadPublicationById(newVal);
    model.value = publication.content
    title.value = publication.title
    type.value = publication.type.id
    currentSection.value = 'EDIT'
  }
}, {immediate: true})

watch(currentSection, (newVal, oldValue) => {
  if (newVal === 'PUBLICATIONS') {
    if (route.query.id) {
      router.push('/admin')
    }
  }
})

function changeQueryParam(id) {
  router.push({
    path: '/admin',
    query: {
      id: id
    }
  })
}

onMounted(async () => {
  if (route.query.id) {
    const publication = await loadPublicationById(route.query.id);
    if (publication) {
      model.value = publication.content
      title.value = publication.title
      type.value = publication.type.id
    }
  }
})

</script>

<template>
  <div class="account">

    <div class="account_fields">
      <UIButton text="Редактор" @click="() => currentSection = 'EDIT'"/>
      <UIButton text="Публикации" @click="() => currentSection = 'PUBLICATIONS'"/>
      <UIButton text="Пользователи" @click="() => currentSection = 'USERS'"/>
      <UIButton text="Свалки" @click="() => currentSection = 'DUMPS'"/>
    </div>

    <div class="account_publications" v-if="currentSection === 'PUBLICATIONS'">
      <div
          v-for="publication in publications"
          :key="publication.id"
          style="display: flex"
      >
        <PostTemplate
            :id="publication.id"
            :title="publication.title"
            :type="publication.type.type"
            :content="publication.content"
            :created-at="publication.createdAt"/>
        <div class="account_publications_actions">
          <img
              style="height: 3rem"
              src="../assets/icons/write.png"
              alt="Изменить публикацию"
              @click="() => changeQueryParam(publication.id)"
          >
          <img
              style="height: 3rem"
              src="../assets/icons/dump.png"
              alt="deleteUser"
              @click="async () => {
                await deletePublication(publication.id)
                await updateData()
              }"
        />
        </div>
      </div>
    </div>


    <div class="account_edit" v-if="currentSection === 'EDIT'">

      <div class="header-container">
        <img
            class="header-icon"
            src="@/assets/icons/add-user.png" alt="add-user">
        <p class="header-text">Регистрация сотрудника</p>
      </div>

      <UIInput
          v-model="employeeEmail"
          class="authorization_input"
          icon="email"
          type="email"
          placeholder="Введите почту..."
          alt="email"
      />
      <UIInput
          v-model="employeePassword"
          class="authorization_input"
          icon="password"
          type="password"
          placeholder="Введите пароль..."
          alt="password"
      />

      <div class="account__button">
        <UIButton
            text="Сохранить"
            @click="async () => {
              await createNewEmployee(employeeEmail, employeePassword);
              await updateData();
            }"
        />
      </div>

      <div class="admin_create-post_container">
        <div class="header-container">
          <img
              class="header-icon"
              src="@/assets/icons/write.png" alt="write">
          <p class="header-text">Создание поста</p>
        </div>

        <UIInput type="text" placeholder="Введите заголовок..." alt="email" v-model="title"/>
        <select v-model="type">
          <option value="1">Статья</option>
          <option value="2" selected>Новость</option>
          <option value="3">Проект</option>
          <option value="4">Мероприятие</option>
        </select>
        <div style="border: 1px solid #ccc; margin-top: 10px">
          <Toolbar
              :editor="editorRef"
              :defaultConfig="toolbarConfig"
              :mode="mode"
              style="border-bottom: 1px solid #ccc"
          />
          <Editor
              :defaultConfig="editorConfig"
              :mode="mode"
              v-model="model"
              style="height: 400px; overflow-y: hidden"
              @onCreated="handleCreated"
          />
        </div>
      </div>

      <div class="account__button">
        <UIButton text="Сохранить" @click="() => createPost()"/>
      </div>
    </div>

    <div class="account_dumps" v-if="currentSection === 'DUMPS'">

      <div
          class="table_mobile"
          v-for="dump in dumps"
          :key="dump.id"
      >
        <div>
          <p class="plain-text">Пользователь</p>
          <p class="highlight-text">{{ dump.user.login }}</p>
        </div>
        <div>
          <p class="plain-text">Сообщение</p>
          <p class="highlight-text">{{ dump.comment }}</p>
        </div>
        <div>
          <p class="plain-text">Изображения</p>
          <SimpleGallery
            gallery-i-d="Main"
            :images="dump.pictures"
          />
        </div>
        <div>
          <p class="plain-text">Долгота</p>
          <p class="highlight-text">{{ dump.longitude }}</p>
        </div>
        <div>
          <p class="plain-text">Широта</p>
          <p class="highlight-text">{{ dump.latitude }}</p>
        </div>
        <div>
          <div>
            <p class="plain-text">Дата создания</p>
            <p class="highlight-text">{{ formatSimpleDate(new Date(dump.createdAt)) }}</p>
          </div>
          <div>
            <hr>
          </div>

        </div>
      </div>
      <div class="table_desktop">
        <table>
          <tr>
            <th class="plain-text">Пользователь</th>
            <th class="plain-text">Сообщение</th>
            <th class="plain-text">Изображения</th>
            <th class="plain-text">Долгота</th>
            <th class="plain-text">Широта</th>
            <th class="plain-text">Дата создания</th>
          </tr>
          <tr
              v-for="dump in dumps"
              :key="dump.id"
          >
            <td class="plain-text">{{ dump.user.login }}</td>
            <td class="plain-text">{{ dump.comment }}</td>
            <td>
              <SimpleGallery
                  gallery-i-d="Main"
                  :images="dump.pictures"
              />
            </td>
            <td class="plain-text">{{ dump.longitude }}</td>
            <td class="plain-text">{{ dump.latitude }}</td>
            <td class="plain-text">{{ formatSimpleDate(new Date(dump.createdAt)) }}</td>
          </tr>
        </table>
      </div>
    </div>

    <div class="account_users" v-if="currentSection === 'USERS'">

      <div
          class="table_mobile"
          v-for="user in users"
          :key="user.id"
      >
        <div class="table_mobile_wrapper">
          <p class="plain-text">Пользователь</p>
          <p class="highlight-text">{{ user.login }}</p>
        </div>
        <div class="table_mobile_wrapper">
          <p class="plain-text">Роль</p>
          <select
              name="role"
              id="role"
              @change="(e) => changeUserType(user.id, e.target.value, async () => await updateData())"
          >
            <option
                value="1"
                :selected="user.userType.id === 1"
            >Админ</option>
            <option
                value="2"
                :selected="user.userType.id === 2"
            >Пользователь</option>
          </select>
        </div>
        <div class="table_mobile_wrapper">
          <p class="plain-text">Дата регистрации</p>
          <p class="highlight-text">{{ formatSimpleDate(new Date(user.createdAt)) }}</p>
        </div>
        <div class="table_mobile_wrapper">
          <p class="plain-text">Удалить</p>
          <img
              style="width: 3rem"
              src="../assets/icons/dump.png"
              alt="deleteUser"
              @click="() => deleteUser(user.id, async () => await updateData())"
          />
        </div>
        <hr>
      </div>

      <div class="table_desktop">
        <p class="header-text">Заявки на подключение</p>
        <table>
          <tr>
            <th>Пользователь</th>
            <th>Действия</th>
          </tr>
          <tr
              v-for="request in requests"
              :key="request.id"
          >
            <td>{{request.user.login}}</td>
            <td>
              <div style="display:flex;">
                <UIButton
                  text="Подключить"
                  @click="() => approveUserRequest(request.user.id, async () => await updateData())"
                />
                <UIButton
                  text="Отклонить"
                  @click="() => disapproveUserRequest(request.user.id, async () => await updateData())"
                />
              </div>
            </td>
          </tr>
        </table>

        <p class="header-text">Список пользователей</p>
        <table>
          <tr>
            <th class="plain-text">Пользователь</th>
            <th class="plain-text">Роль</th>
            <th class="plain-text">Дата регистрации</th>
            <th class="plain-text">Удалить</th>
          </tr>
          <tr
              v-for="user in users"
              :key="user.id"
          >
            <td class="plain-text">{{ user.login }}</td>
            <td>
              <select
                  name="role"
                  id="role"
                  @change="(e) => changeUserType(user.id, e.target.value, async () => await updateData())"
              >
                <option
                    value="1"
                    :selected="user.userType.id === 1"
                >Админ</option>
                <option
                    value="2"
                    :selected="user.userType.id === 2"
                >Пользователь</option>
              </select>
            </td>
            <td class="plain-text">
              {{ formatSimpleDate(new Date(user.createdAt)) }}
            </td>
            <td>
              <img
                  style="width: 3rem"
                  src="../assets/icons/dump.png"
                  alt="deleteUser"
                  @click="() => deleteUser(user.id, async () => await updateData())"
              />
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>


<style lang="scss">
@import "src/assets/styles/main";

.account {
  padding: 20% 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex-grow: 1;

  &_publications_actions {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 1rem;
  }

  &_edit {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: 1rem;

    &__autorization {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 400px;
    }
  }

  &_fields {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
  }

  &_only-user {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}

.table_desktop {
  display: none;
}

.table_mobile {
  gap: 2rem;
  display: flex;
  flex-direction: column;
  width: 100%;

  &_wrapper {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
}


@media (min-width: 1000px) {
  .account {
    padding: 8rem 7rem;
    gap: 2rem;

    &_fields {
      flex-direction: row;
    }

    &_edit {
      gap: 2rem;

    }

    &__button {
      width: 50%;
    }
  }

  .table_desktop {
    display: block;
  }

  .table_mobile {
    display: none;
  }
}

@media (min-width: 992px) {
  .account {
    padding: 10rem 15rem;

    &__button {
      width: 30%;
    }
  }
}

@media (min-width: 1200px) {
  .account {
    padding: 12rem 25rem;

    &_edit {
      gap: 3rem;
    }

    &_only-user {
      flex-direction: row;
      align-items: center;
      gap: 2rem;
    }

    &__button {
      width: 40%;
    }
  }
}

@media (min-width: 1600px) {
  .account {
    &__button {
      width: 20%;
    }
  }
}

.admin {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex-grow: 1;

  &_create-post_container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}

select {
  appearance: none;
  border: 0;
  outline: 0;
  font: inherit;
  width: 20rem;
  padding: 1rem 4rem 1rem 1rem;
  background: url(https://upload.wikimedia.org/wikipedia/commons/9/9d/Caret_down_font_awesome_whitevariation.svg) no-repeat right 0.8em center / 1.4em,
  linear-gradient(to left, $text-secondary 3em, $text-rear 3em);
  color: $black;
  border-radius: 1.5rem;
  box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;

  &::-ms-expand {
    display: none;
  }

  &:focus {
    outline: none;
  }

  option {
    color: inherit;
    background-color: $text-rear;
  }
}

@media (min-width: 500px) {
  .admin {
    &__button {
      width: 50%;
    }
  }
}

@media (min-width: 992px) {
  select {
    font-size: 2rem;
  }

  .admin {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    &_create-post_container {
      width: 80%;
    }

    &__button {
      width: 30%;
    }
  }
}

@media (min-width: 1200px) {
  select {
    font-size: 2rem;
  }

  .admin {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    &_create-post_container {
      width: 80%;
    }

    &__button {
      width: 40%;
    }
  }
}

@media (min-width: 1600px) {
  .admin {
    &__button {
      width: 20%;
    }
  }
}
</style>