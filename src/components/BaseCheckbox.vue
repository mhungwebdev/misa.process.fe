<template>
    <div :class="`msp-checkbox-container flex align-items-center ${disabled ? 'msp-checkbox-disabled' : ''}`">
        <div 
            @click="!disabled && handleChangeState()" 
            :class="{
                'msp-icon-square-uncheck': !isChecked,
                'msp-checkmark': true,
                'msp-icon-square-check': isChecked,
                'msp-icon-v3': true,
                'cursor-pointer': true
            }"
            :tabindex="tabIndex"
        >
        </div>
        <div 
            @click="!disabled && handleChangeState()" 
            :title="itemCheckbox[fieldDisplay]"
            class="msp-checkbox-label cursor-pointer"
        >
            {{  itemCheckbox[fieldDisplay]  }}
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //trạng thái của checkbox (checked or unchecked)
            isChecked: false
        }
    },
    props: {
        //item checkbox
        itemCheckbox:{
            type: Object,
            required: true
        },
        //field sẽ hiển thị label
        fieldDisplay:{
            type: String,
            required: true
        },
        //trạng thái của checkbox (enabled or disabled)
        disabled: Boolean,
        //giá trị khởi tạo của checkbox
        checked:Boolean,
        //tabindex
        tabIndex:{
            type: Number,
            default: 0,
        }
    },
    created() {
        this.isChecked = this.checked
    },
    watch:{
        checked(newValue){
            this.isChecked = newValue
        }
    },
    methods: {
        //Thay đổi state của checkbox
        //Author : mhungwebdev (28/8/2022)
        handleChangeState() {
            this.isChecked = !this.isChecked
            this.$emit('changeChecked', this.itemCheckbox)
        }
    }
}
</script>

<style scoped>
@import url(../css/components/checkbox.css);
</style>