<template>
    <BasePopup @keydown="e => {if(e.key == 'Escape') $emit('closeEditColumn')}" id="msp-popup-setting-column">
        <template #header>
            <div class="msp-popup-header flex align-items-center flex-between">
                <div class="msp-setting-column-title">Tùy chỉnh cột</div>

                <div @click="$emit('closeEditColumn')" class="msp-icon-close border-circle pst-relative flex-center">
                    <div class="msp-icon-x msp-icon-v2 msp-icon-24 cursor-pointer"></div>
                    <div class="msp-icon-close-tooltip">Đóng</div>
                </div>
            </div>
        </template>

        <template #main>
            <div class="msp-setting-column">
                <div>
                    <BaseInput 
                        @changeValue="value => keyword = value" 
                        class="msp-setting-column-input" 
                        :value="keyword"
                        placeholder="Tìm kiếm"
                        :initFocus="true"
                    >
                        <div class="msp-icon msp-icon-24 msp-icon-search"></div>
                    </BaseInput>
                </div>

                <div class="msp-user-setting-list-colum flex flex-column">
                    <BaseCheckbox 
                        v-for="(fieldRender, index) in list" 
                        :disabled="fieldRender?.require" 
                        :key="index"
                        :itemCheckbox="fieldRender" 
                        fieldDisplay="fieldDisplay" 
                        :checked="fieldRender?.isRender"
                        @keydown="e => {if(e.key =='Enter' && !fieldRender?.require) handleChangeStateColumn(fieldRender)}"
                        @changeChecked="handleChangeStateColumn" 
                    />
                </div>
            </div>
        </template>

        <template #button-left>
            <BaseButton 
                @click="$emit('getDefault')" 
                class="msp-button-cancel" 
                type="outline"
                label="Lấy lại mặc định" 
                @keydown="e => {if(e.key == 'Enter') $emit('getDefault')}"
            />
        </template>

        <template #button-right>
            <BaseButton 
                @click="$emit('saveEditColumn')" 
                class="msp-button-save-edit-column" 
                label="Áp dụng" 
                @keydown="e => {if(e.key == 'Enter') $emit('saveEditColumn')}"
            />
        </template>
    </BasePopup>
</template>

<script>
import { CommonJS } from '../../../../JS/CommonJS';
    export default {
        data() {
        return {
            //list field setting
            listField: [],
            keyword:""
        }
    },
    props: {
        //list field ban đầu
        listFieldProp: {
            type: Array,
            required: true,
        }
    },
    created() {
        this.listField = JSON.parse(JSON.stringify(this.listFieldProp));
    },
    computed:{
        list(){
            if(this.keyword)
                return this.listField.filter(item => {
                    const fieldDisplay = CommonJS.removeSymbol(item?.fieldDisplay.trim().toLowerCase())
                    const keyword = (CommonJS.removeSymbol(this.keyword.trim().toLowerCase()))
                    console.log({fieldDisplay, keyword})
                    if(fieldDisplay.search(keyword) > -1)
                        return item
                })
            else
                return this.listField
        }
    },
    methods: {
        /**
        * Thay đổi state của column
        * Author : mhungwebdev (27/8/2022)
        * @param {*} fieldRender field của column
        */
        handleChangeStateColumn(fieldRender) {
            const fieldChange = this.listField.find(frd => frd.fieldName == fieldRender.fieldName)
            fieldChange.isRender = !fieldChange.isRender
        },
    }
}
</script>

<style scoped>
@import url(../../../../css/page/setting/views/popups/PopupSettingColumn.css);
</style>