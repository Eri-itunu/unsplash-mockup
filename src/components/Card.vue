<template>
    <div v-if="item" @click="togglePopup" class="wrap">
        <div class="photoItem" >
            <img :src="item.urls.small" alt="Photo" />
        </div>
        <div class="nameOverlay" >  
            <h4>{{ item?.user.name }}</h4>
            <p>{{item?.user.location}}</p>
        </div>
    </div>
    <Popup v-if="showPopup" :togglePopup="togglePopup">
        <img class="popupPhoto" :src="item?.urls.full" alt="Photo" />
    </Popup>
</template>

<script setup lang="ts">
import {ref} from "vue";
import type {resultsArray} from "../../types";
const showPopup = ref(false);
const togglePopup = () => {
    showPopup.value = !showPopup.value;
};
import Popup from "./Popup.vue";
const props = defineProps<{
    item: resultsArray;
}>();
</script>

<style scoped>
/* Add your styles here */
.photoItem img {
  width: 100%;
  border-radius: 8px;
  display: block;
  object-fit: cover;
}

.popupPhoto{
    width: 100%;
    height: 500px;
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

.nameOverlay{
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    color: white;
    display: flex;
    justify-content: end;
    align-items: start;
    font-size: 1rem;
    flex-direction: column;
    font-weight: thin;
    border-radius: 8px;
    padding-bottom:20px;
    padding-left: 20px;
}



.nameOverlay:hover{
    background-color: rgba(0, 0, 0, 0.5);
    transition: 0.5s;
}


</style>