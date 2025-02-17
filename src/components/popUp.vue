<template>
    <div class="popup" >
        <button @click="togglePopup">X</button>
        <div class="popup-inner">
            <div class="popup-content">
                <slot />
            </div>
        </div>

    </div>

</template>

<script setup lang="ts">

defineProps({
    togglePopup: Function
});

</script>

<style  scoped>
.popup{
    position: fixed;
    top:0;
    left:0;
    right: 0 ;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;

}


.popup-inner{
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    width: 80%;
    height: 80%
}

</style>