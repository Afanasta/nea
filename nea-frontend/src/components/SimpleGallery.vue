<template>
  <div :id="galleryID">
    <a
        v-for="(image, key) in imagesData"
        :key="key"
        :href="generatePicture(image.content)"
        :data-pswp-width="500"
        :data-pswp-height="500"
        target="_blank"
        rel="noreferrer"
    >
      <img
          style="max-width: 3rem"
          :src="generatePicture(image.content)"
          alt=""
      />
    </a>
  </div>
</template>

<script>
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import {generatePicture} from "@/plugins/axios.js";

export default {
  name: 'SimpleGallery',
  props: {
    galleryID: String,
    images: Array,
  },
  setup(props) {

    return {
      imagesData: props.images,
    };
  },
  async mounted() {
    if (!this.lightbox) {
      this.lightbox = new PhotoSwipeLightbox({
        gallery: '#' + this.$props.galleryID,
        children: 'a',
        pswpModule: () => import('photoswipe'),
      });
      await this.prepareImagesForPhotoswipe();
      this.lightbox.init();
    }
  },
  unmounted() {
    if (this.lightbox) {
      this.lightbox.destroy();
      this.lightbox = null;
    }
  },
  methods: {
    generatePicture,
    async prepareImagesForPhotoswipe() {
      // Get the <a> tags from the image gallery
      const imagesList = document.querySelectorAll("#Main a");
      const promisesList = [];
      imagesList.forEach((element) => {
        const promise = new Promise(function (resolve) {
          let image = new Image();
          image.src = element.getAttribute('href');
          image.onload = () => {
            element.dataset.pswpWidth = image.width;
            element.dataset.pswpHeight = image.height;
            resolve();
          }
          image.onerror = () => {
            resolve();
          };
        });
        promisesList.push(promise);
      });
      await Promise.all(promisesList);
    }
  },
};
</script>

<style lang="scss">

</style>