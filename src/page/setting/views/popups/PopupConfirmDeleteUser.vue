<template>
    <BaseOverlay @keydown="e => {if(e.key =='Escape') $emit('closePopupDelete')}">
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
                <div class="msp-popup-delete-user-msg">
                    Bạn có chắc chắn muốn xóa <b>{{ nameUserDelete }}</b> khỏi ứng dụng AMIS Quy trình
                    không?
                </div>
            </template>

            <template #button-left>
                <BaseButton 
                    @click="$emit('closePopupDelete')" 
                    class="msp-button-cancel" 
                    type="outline"
                    label="Hủy" 
                    @keydown="handleKeyDownBtnCancel"
                    :tabIndex="3"
                />
            </template>

            <template #button-right>
                <div tabindex="1" class="tab-again"></div>
                <BaseButton 
                    @click="$emit('confirmDelete')" 
                    @keydown="e => {if(e.key == 'Enter') $emit('confirmDelete')}"
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
    props:{
        nameUserDelete:{
            type: String,
            required: true
        }
    },
    mounted(){
        document.getElementById("msp-popup-delete").querySelector(".msp-button-delete[tabindex]").focus()
    },
    methods:{
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
@import url(../../../../css/page/setting/views/popups/PopupConfirmDeleteUser.css);
</style>