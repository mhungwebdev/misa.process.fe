<template>
    <BaseOverlay @keydown.esc="$emit('closePopupDelete')">
        <BasePopup id="msp-popup-delete">
            <template #header>
                <div class="msp-popup-header flex align-items-center flex-between">
                    <div class="msp-popup-delete-title">Xóa người dùng</div>

                    <div @click="$emit('closePopupDelete')"
                        class="msp-icon-close border-circle pst-relative flex-center">
                        <div class="msp-icon-x msp-icon-v2 msp-icon-24 cursor-pointer"></div>
                    </div>
                </div>
            </template>

            <template #main>
                <slot name="messageConfirmDelete"></slot>
            </template>

            <template #button-left>
                <BaseButton 
                    @click="$emit('closePopupDelete')" 
                    class="msp-button-cancel" 
                    type="outline"
                    :label="$t('message.textCancelButton')" 
                    @keydown="handleKeyDownBtnCancel"
                    :tabIndex="3"
                />
            </template>

            <template #button-right>
                <div tabindex="1" class="tab-again"></div>
                <BaseButton 
                    @click="$emit('confirmDelete')" 
                    @keydown.enter="$emit('confirmDelete')"
                    :bgColor="'#e61d1d'" 
                    :borderColor="'#e61d1d'"
                    class="m-r-8 msp-button-delete" 
                    label="Xóa" 
                    :tabIndex="2"
                />
            </template>
        </BasePopup>
    </BaseOverlay>
</template>

<script>
export default {
    mounted(){
        document.getElementById("msp-popup-delete").querySelector(".msp-button-delete[tabindex]").focus()
    },
    methods:{
        /**
         * Xử lý key down button cancel 
         * Author : mhungwebdev (5/9/2022)
         */
        handleKeyDownBtnCancel(e){
            if(e.key == 'Enter')
                this.$emit('closePopupDelete')
            
            if(e.key == 'Tab')
                document.getElementById("msp-popup-delete").querySelector(".tab-again[tabindex]").focus()
        }
    }
}
</script>

<style scoped>
@import url('../../../css/page/setting/popups/PopupConfirmDeleteUser.css');
</style>