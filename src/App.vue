<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import GridSkeleton from "./components/GridSkeleton.vue";
import PhotoCard from "./components/PhotoCard.vue";
import { Search } from 'lucide-vue-next';

const query = ref("");
const searchQuery = ref("");
const photo = ref<any[]>([]);
const loading = ref(false);

const startSearch = () => {
  searchQuery.value = query.value;
};

const getPhotos = async () => {
  photo.value = [];
  loading.value = true;
  const searchParam = searchQuery.value || "african";
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}?query=${searchParam}&per_page=12`, 
      {
        headers: {
          Authorization: `Client-ID ${import.meta.env.VITE_CLIENT_KEY}`,
        },
      }
    );
    photo.value = res.data.results;
    loading.value = false;
  } catch (error: any) {
    loading.value = false;
    console.log(error);
  }
};

// Fetch new photos when query changes
watch(searchQuery, getPhotos);

onMounted(() => {
  getPhotos(searchQuery.value);
});
</script>

<template>
  <div class="mainHeader">
    <h1 v-if="loading" >Searching for "{{ query }}"</h1>
    <h1 v-if="searchQuery && !loading"> Search results for {{ searchQuery }}</h1>
    <div class="form-group">
      
      <div class="input-container">
        <div class="input-wrapper">
          <input
            id="search"
            name="search"
            placeholder="Search for a photo"
            class="form-input"
            v-model="query"
            @keyup.enter="startSearch"
          />
          <Search class="folder-icon" />
        </div>
      </div>
    </div>
  </div>

  <div class="photoGallery">
    <div
      v-if="loading"
      class="photoItem"
      v-for="(skeleton, index) in 9"
      :key="index"
    >
      <GridSkeleton />
    </div>
    <div class="photoItem" v-for="(item, pos) in photo" :key="pos">
     
      <PhotoCard :item="item"  />
    </div>
  </div>
</template>

<style scoped>
/* Main header spans full viewport width */
.mainHeader {
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: left;
  justify-content: center;
  height: 250px;
  background-color: #DDE3EA;
}

/* Form group now spans 80% of the viewport width */
.form-group {
  width: 80vw;
  margin-bottom: 1rem; /* equivalent to mb-4 */
}

/* Label styling */
.form-label {
  display: block;
  margin-bottom: 0.5rem; /* equivalent to mb-2 */
  font-size: 0.875rem; /* roughly text-sm */
  font-weight: 500; /* font-medium */
}

/* Input container fills the form group */
.input-container {
  width: 100%;
  position: relative;
  margin-top: 0.5rem; /* equivalent to mt-2 */
  border-radius: 0.375rem; /* equivalent to rounded-md */
}

/* Wrapper to position the icon */
.input-wrapper {
  position: relative;
}

/* Input styling */
.form-input {
  display: block;
  width: 100%;
  border-radius: 0.375rem; /* rounded-md */
  border: 1px solid #e5e7eb; /* border-gray-200 */
  padding: 20px;
  padding-left: 2.5rem; /* leaves space for the icon */
  font-size: 0.875rem; /* text-sm */
  outline: 2px solid transparent;
}

.form-input::placeholder {
  color: #6b7280; /* placeholder:text-gray-500 */
}

/* Icon styling */
.folder-icon {
  pointer-events: none;
  position: absolute;
  left: 0.75rem; /* equivalent to left-3 */
  top: 50%; /* equivalent to top-1/2 */
  height: 18px;
  width: 18px;
  transform: translateY(-50%); /* centers vertically */
  color: #6b7280; /* text-gray-500 */
}

/* Change icon color when the input is focused */
.input-wrapper:focus-within .folder-icon {
  color: #111827; /* equivalent to peer-focus:text-gray-900 */
}

/* Photo gallery styles */
.photoGallery {
  column-count: 3;
  column-gap: 40px;
  width: 70%;
  margin: auto;
  margin-top: -50px; /* Moves the gallery up, overlapping header */
}

.photoItem {
  display: inline-block;
  width: 100%;
  margin-bottom: 15px;
}

.photoItem img {
  width: 100%;
  border-radius: 8px;
  display: block;
  object-fit: cover;
}
</style>
