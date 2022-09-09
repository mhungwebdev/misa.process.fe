<template>
    <BaseOverlay>
        <BasePopup id="msp-popup-confirm-close-form" >
            <template #header>
                <div class="msp-popup-header flex align-items-center flex-between">
                    <div class="msp-popup-confirm-close-form-title">Xác nhận</div>

                    <div @click="$emit('closePopup')"
                        class="msp-icon-close border-circle pst-relative flex-center">
                        <div class="msp-icon-x msp-icon-v2 msp-icon-24 cursor-pointer"></div>
                    </div>
                </div>
            </template>

            <template #main>
                <div class="msp-popup-confirm-close-form-msg">
                    {{Resource.confirmCloseForm}}
                </div>
            </template>

            <template #button-left>
                <BaseButton 
                    @click="$emit('closePopup')" 
                    class="msp-button-cancel" 
                    type="outline"
                    label="Hủy" 
                />

                <BaseButton 
                    @click="$emit('closeForm')" 
                    class="msp-button-cancel" 
                    type="outline"
                    label="Không lưu" 
                    id="msp-button-not-save-form"
                />
            </template>

            <template #button-right>
                <BaseButton 
                    @click="$emit('saveForm')" 
                    class="m-r-8"
                    id="msp-button-confirm-save-form" 
                    label="Lưu" 
                />
            </template>
        </BasePopup>
    </BaseOverlay>
</template>

<script>
import { Resource } from '../../../../Resource/Resource';
    export default {
        setup(){
            return {
                Resource
            }
        }
    }
</script>

<style scoped>
@import url(../../../../css/page/setting/views/popups/PopupConfirmCloseForm.css);
</style>