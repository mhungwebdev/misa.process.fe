<template>
    <BaseOverlay id="msp-popup-error">
        <BasePopup class="msp-popup-error">
            <template #main>
                <div class="msp-popup-error-form">
                    <div class="msp-popup-error-form-icon"></div>
                    <div class="msp-popup-error-form-text">{{ errorMsg }}</div>
                </div>
            </template>

            <template #button-right>
                <BaseButton @keydown="e => {if(e.key =='Enter') $emit('closeErrorForm')}" :tabIndex="0"
                    @click="$emit('closeErrorForm')" class="m-r-8" label="Đóng" :focus="true" />
            </template>
        </BasePopup>
    </BaseOverlay>
</template>

<script>
export default {
    props:{
        errorMsg:{
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>
@import url(../../../../css/page/setting/views/popups/PopupErrorForm.css);
</style>