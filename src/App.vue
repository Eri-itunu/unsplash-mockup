<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import Skeleton from "@/components/Skeleton.vue";
import Card from "@/components/Card.vue";
import { Search } from 'lucide-vue-next';
import type { UnsplashResponse } from "../types";
const query = ref("");
const searchQuery = ref("");
const photo = ref<any[]>([]);
const loading = ref(false);
const total = ref(0)

const startSearch = () => {
  searchQuery.value = query.value;
};

const getPhotos = async () => {
  photo.value = [];
  loading.value = true;
  const searchParam = searchQuery.value || "african";
  try {
    const res = await axios.get<UnsplashResponse>(
      `${import.meta.env.VITE_API_URL}?query=${searchParam}&per_page=12`, 
      {
        headers: {
          Authorization: `Client-ID ${import.meta.env.VITE_CLIENT_KEY}`,
        },
      }
    );

    photo.value = res.data.results;
    total.value = res.data.total;
    loading.value = false;
  } catch (error: any) {
    loading.value = false;
    console.log(error);
  }
};


watch(searchQuery, getPhotos);

onMounted(() => {
  getPhotos();
});
</script>
#2D3E50
<template>
  <div class="mainHeader">
    <div class="subHeader" >
      <h1 class="headerText" v-if="loading && query" >Searching for "{{ query }}"</h1>
      <h1 class="headerText" v-if="searchQuery && !loading"> Search results for {{ searchQuery }}</h1>
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
            <Search class="search-icon" />
          </div>
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
      <Skeleton />
    </div>
    <div v-if="photo" class="photoItem"  v-for="(item, pos) in photo" :key="pos">
     
      <Card :item="item"  />
    </div>
  </div>
</template>

<style scoped>

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

.subHeader{
  width:80vw;
  text-align: left;
}

.headerText {
  color: #2D3E50;
  text-align: left;
}


.form-group {
  width: 80vw;
  margin-bottom: 1rem; 
}


.input-container {
  width: 100%;
  position: relative;
  margin-top: 0.5rem; 
  border-radius: 0.375rem; 
}


.input-wrapper {
  position: relative;
}


.form-input {
  display: block;
  width: 100%;
  border-radius: 0.375rem; 
  border: 1px solid #e5e7eb; 
  padding: 20px;
  padding-left: 2.5rem; 
  font-size: 0.875rem; 
  outline: 2px solid transparent;
}

.form-input::placeholder {
  color: #6b7280; 
}


.search-icon {
  pointer-events: none;
  position: absolute;
  left: 0.75rem; 
  top: 50%; 
  height: 18px;
  width: 18px;
  transform: translateY(-50%);
  color: #6b7280; 
}


.input-wrapper:focus-within .search-icon {
  color: #111827;
}


.photoGallery {
  column-count: 3;
  column-gap: 40px;
  width: 70%;
  margin: auto;
  margin-top: -50px;
}


@media (max-width: 1024px) {
  .photoGallery {
    column-count: 2;
  }
}


@media (max-width: 640px) {
  .photoGallery {
    column-count: 1;
    width: 90%;
  }
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
