<template>
    <div :style="{ width: width }"
        class="msp-popup-container flex flex-column">

        <slot name="header"></slot>
        <div class="msp-popup-content flex-1">
            <slot name="main"></slot>
        </div>

        <div v-if="showButtonGr" class="msp-popup-button-gr flex align-items-center flex-end">
            <slot name="button-left"></slot>
            <slot name="button-right"></slot>
        </div>
    </div>
</template>

<script>
import BaseButton from './BaseButton.vue';
export default {
    components: { BaseButton },
    props: {
        //Độ rộng
        width: String,
        //Có show button footer không
        showButtonGr:{
            type:Boolean,
            default:true
        }
    }
}
</script>

<style scoped>
@import url(../css/components/popup.css);
</style>