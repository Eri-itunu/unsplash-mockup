<template>
  <div v-if="item" @click="showPopup" class="wrap">
    <div class="photoItem">
      <img :src="item.urls.small" alt="Photo" />
    </div>
    <div class="nameOverlay">
      <h4>{{item?.user.name }}</h4>
      <p>{{item?.user.location }}</p>
    </div>
  </div>
  <Popup class="popupPhoto" v-if="showPopupState" @custom-event="togglePopup">
    <div class="popup-content">
      <img :src="item?.urls.small_s3" alt="Photo" />
      <h3  >{{ item.user.name }}</h3>
      <p class="moveLeft" >{{ item.user.location }}</p>
    </div>
  </Popup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { resultsArray } from '../../types'
import Popup from '@/components/CardPopup.vue'
const showPopupState = ref(false)
const togglePopup = () => {
  showPopupState.value = !showPopupState.value
}

const showPopup = () => {
  showPopupState.value = true
}

const props = defineProps<{
  item: resultsArray
}>()
</script>

<style scoped>

.popupPhoto {
  border: 2px solid black;
}

.photoItem img {
  width: 100%;
  border-radius: 8px;
  display: block;
  object-fit: fill;
}

.popupPhoto img {
  width: 100%;
  height: 500px;
  border-radius: 8px 8px 0 0;
}

.popupPhoto h2 {
  padding-left: 20px;
  font-size: 1.5rem;
}
.moveLeft{
  padding-left: 30px;
}
.popup-content h3{
  padding-left: 30px;
  color: #2D3E50;
}
.popup-content h3{
  padding-top: 30px;
}
.popup-content p{
  padding-bottom: 30px;
}


.wrap {
  display: grid;
  border-radius: 8px;
  cursor: pointer;
  overflow: hidden;
  & > * {
    grid-column: 1;
    grid-row: 1;
  }
}

.nameOverlay {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  color: white;
  display: flex;
  justify-content: end;
  align-items: start;
  font-size: 1rem;
  flex-direction: column;
  font-weight: thin;
  border-radius: 8px;
  padding-bottom: 20px;
  padding-left: 20px;
}

.nameOverlay h4, p {
  margin: 0;
  padding:0;
  font-weight: thin;

}

.nameOverlay:hover {
  background-color: rgba(0, 0, 0, 0.5);
  transition: 0.5s;
}
</style>
