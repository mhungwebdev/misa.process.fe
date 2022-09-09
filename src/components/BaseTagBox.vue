<template>
    <div :class="`msp-tag-box-wrapper ${error ? 'msp-border-field-error' : ''}`">
        <DxTagBox 
            :display-expr="fieldDisplay" 
            :value-expr="fieldName" 
            :data-source="data" 
            :width="width"
            :value="value"
            :showDropDownButton="true" 
            drop-down-button-template="dropdownButton"
            :placeholder="placeholder"
            tag-template="tagTemplate"
            itemTemplate="itemTemplate"
            :onValueChanged="e => $emit('changeValue', e.value)"
            :opened="opened"
            :searchEnabled="true"
            :onFocusIn="handleFocus" 
            :onFocusOut="handleBlur" 
            :tabIndex="tabIndex"
            noDataText="Không có dữ liệu"
            searchMode="startswith"
        >
            <template #dropdownButton>
                <div class="msp-icon-dropdown msp-icon-v2 msp-icon-20 h-full"></div>
            </template>

            <template #tagTemplate="{ data }">
                <div class="dx-tag-content flex align-items-center">
                    <div :title="data[fieldDisplay]" class="msp-tag-content text-nowrap text-ellipsis">{{data[fieldDisplay]}}</div>
                    <div class="dx-tag-remove-button msp-tag-remove-button msp-icon-v4"></div>
                </div>
            </template>

            <template #itemTemplate="{ data }">
                <div class="msp-dropdown-item-custom-dx">
                    <div class="msp-dropdown-item-text text-ellipsis flex align-items-center flex-between">
                        <div class="h-full text-ellipsis">{{ data[fieldDisplay] }}</div> 
                    </div>
                    <span class="msp-dropdown-item-custom-tooltip">{{ data[fieldDisplay] }}</span>
                </div>
            </template>
        </DxTagBox>
    </div>
</template>

<script>
import DxTagBox from 'devextreme-vue/tag-box'
export default {
    components: { DxTagBox },
    data() {
        return {
            opened:false,
            value:[]
        }
    },
    props: {
        //field sẽ hiển thị
        fieldDisplay: {
            type: String,
            required: true,
        },
        //field lấy giá trị
        fieldName: {
            type: String,
            required: true,
        },
        width: String || Number,
        //dữ liệu sẽ render
        data: {
            type: Array,
            required: true,
        },
        placeholder:String,
        //thông báo lỗi
        error:String,
        tabIndex:Number,
    },
    methods:{
        /**
         * Blur tag box
         * Author : mhungwebdev (2/9/2022)
         */
        handleBlur(){
            this.opened = false
            this.$emit('blurTagBox')
        },

        /**
         * Focus dropdown
         * Author : mhungwebdev (2/9/20222)
         */
         handleFocus(){
            this.opened = true
        },
    }
}
</script>

<style scoped>
</style>