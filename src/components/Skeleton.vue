<template>
    <div class="skeleton-item" :style="{ height: randomHeight }">

        <span class="text-span" ></span>
        <span class="name-span" ></span>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from "vue";
  
  // Define height values directly as CSS values.
  const heights: string[] = ["18rem",  "20rem", "24rem"];
  const randomHeight = ref<string>("");
  
  // Set a random height when the component mounts.
  onMounted(() => {
    randomHeight.value = heights[Math.floor(Math.random() * heights.length)];
  });
  </script>
  
  <style scoped>
  .skeleton-item {
    background-color: #e0e0e0;
    border-radius: 8px;
    animation: pulse 1.5s infinite ease-in-out;
    display: flex;
    align-items: start;
    justify-content: end;
    flex-direction: column;
    padding: 20px;
    gap:3px;
  }

  .text-span {
    background-color: #807c7c;
    width: 120px;
    height: 12px;
    animation: pulse 1.5s infinite ease-in-out;

  }

  .name-span {
    background-color: #807c7c;
    width: 60px;
    height: 12px;
    animation: pulse 1.5s infinite ease-in-out;

  }
  
  /* Keyframes for the pulse animation */
  @keyframes pulse {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.6;
    }
  }
  </style>
  