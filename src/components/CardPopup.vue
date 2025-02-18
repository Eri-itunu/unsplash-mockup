<template>
    <div class="popup">
      <div class="popup-wrapper">
        <div class="popup-inner">
          <div class="popup-content">
            <slot />
          </div>
        </div>
        <button class="close-btn" @click="notifyParent"> <X/> </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { X } from 'lucide-vue-next';
  defineProps<{
    
  }>();

  const emit = defineEmits<{
    (e: 'custom-event'): void;
  }>();

  const notifyParent =()=>{
    emit('custom-event');
  }
  </script>
  
  <style scoped>
  .popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px; 
}

.popup-wrapper {
  position: relative;
  width: 80%;
  max-width: 800px; 
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
}

.popup-inner {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.popup-content {
  display: flex;
  flex-direction: column;
}

.popup-content img {
  width: 100%;
  height: auto;
  object-fit: cover;
  max-height: 400px;
}

.popup-content h2,
.popup-content p {
  margin: 0;
  padding: 1rem 20px;
}


.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
}

@media (max-width: 768px) {
  .popup-wrapper {
    width: 95%;
  }
  .popup-content h2,
  .popup-content p {
    padding: 0.5rem 10px;
  }
}
  

  </style>
  