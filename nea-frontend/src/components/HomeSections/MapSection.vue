<script setup>
import {ref, shallowRef} from 'vue';
import {
  YandexMap,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultSchemeLayer,
  YandexMapListener,
  YandexMapMarker
} from 'vue-yandex-maps';
import DumpInfo from "@/components/DumpInfo.vue";
import {createDump} from "@/plugins/axios.js";
import {useUserStore} from "@/store/index.js";
import {storeToRefs} from "pinia";

const map = shallowRef(null);

const mapWidth = '100%'
const mapHeight = '60vh'

const longitude = ref(null)
const latitude = ref(null)

const showMarker = ref(false)
const showDialogWindow = ref(false)

const store = useUserStore()

const {isUserAuth} = storeToRefs(store)

const logMapClick = (_, event) => {
  if (!isUserAuth.value) {
    return;
  }
  latitude.value = event.coordinates[0]
  longitude.value = event.coordinates[1]
  showMarker.value = true
  setTimeout(() => {
    showDialogWindow.value = true
  }, 1000)
};

function clearInputs(callback) {
  latitude.value = null
  longitude.value = null
  document.querySelector('.dump_info_editor__textarea').value = ''
  callback()
}

async function submitMap(form) {
  const e = form.event;
  const data = new FormData();
  for (const file of e.images.files) {
    data.append('files', file)
  }
  data.append('comment', e.text.value)
  data.append('latitude', latitude.value)
  data.append('longitude', longitude.value)
  if (!latitude.value || !longitude.value) {
    store.updateMessage('Выберите точку на карте', null)
    return;
  }
  if (!e.text.value) {
    store.updateMessage('Добавьте комментарий', null)
    return;
  }
  if (!e.images.files.length) {
    store.updateMessage('Прикрепите как минимум одно изображение', null)
    return;
  }
  await createDump(data, () => clearInputs(form.callback))
}
</script>

<template>
  <div class="map-container">
    <div class="header-container map_header">
      <img class="header-icon" src="../../assets/icons/dump.png" alt="news">
      <p class="header-text">Карта стихийных свалок</p>
    </div>

    <div class="map-container_map">
      <yandex-map
          class="map-container__map"
          v-model="map"
          :settings="{
        location: {
          center: [82.9346, 55.0415],
          zoom: 11}
      }"
          :width="mapWidth"
          :height="mapHeight"
      >
        <yandex-map-default-scheme-layer/>
        <yandex-map-listener :settings="{ onClick: logMapClick }"/>
        <yandex-map-default-features-layer/>
        <yandex-map-marker
            v-if="showMarker"
            :settings="{coordinates: [latitude, longitude]}">
          <template #default>
            <img src="../../assets/icons/marker.png" alt="dump" style="width: 4rem">
          </template>
        </yandex-map-marker>
      </yandex-map>
    </div>
    <DumpInfo
        v-if="isUserAuth"
        @customChange="(e) => submitMap(e)"
      />
    <div v-else
      class="map_warning_wrapper">
      <div class="map_warning">
        <p class="small-header">Для отправки информации о стихийной свалке необходима авторизация</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/styles/main";

.map-container {
  padding: 1% 5% 5%;
  &_map {
    margin-top: 2rem;
    display: flex;
    width: auto;
    flex-direction: column;
    border: $primary2 0.3rem solid;
    box-shadow: rgba(34, 63, 89,0.4) -5px 5px, rgba(34, 63, 89,0.3) -10px 10px, rgba(34, 63, 89,0.2) -15px 15px, rgba(34, 63, 89,0.1) -20px 20px, rgba(34, 63, 89, 0.05) -25px 25px;;;
  }
}

.map_header {
  display: flex;
  align-items: center;
  justify-content: center;
}

.map_warning {
  padding: 3rem 2rem;
  width: 50%;
  text-align: center;

  &_wrapper {
    display: flex;
    justify-content: space-around;
  }
}

@media (min-width: 1200px) {
  .map-container {
    padding: 3rem 15%;
  }
}
</style>