<template>
    <div :style="{width:width}" id="msp-dropdown-container" :class="{'msp-border-field-error':error}">
        <DxSelectBox 
            :placeholder="placeholder" 
            :dataSource="data" 
            dropDownButtonTemplate="buttonDropDown"
            itemTemplate="itemTemplate"
            :drop-down-options="{overflow: 'unset',}"
            :display-expr="fieldDisplay"
            :value-expr="fieldName"
            :value="value"
            :onItemClick="handleClickItem"
            :onKeyDown="handleKeyDown"
            labelMode="hidden"
            :opened="opened"
            :tabIndex="searchEnabled && tabIndex"
            :searchEnabled="searchEnabled"
            :onFocusIn="handleFocus" 
            :onFocusOut="handleBlur"
            noDataText="Không có dữ liệu"
            :onInput="searchEnabled && (e =>  handleInput(e))"
        >
            <template #buttonDropDown>
                <div class="msp-icon-dropdown msp-icon-v2 msp-icon-20"></div>
            </template>

            <template #itemTemplate="{ data }">
                <div class="msp-dropdown-item-custom-dx">
                    <div class="msp-dropdown-item-text text-ellipsis flex align-items-center flex-between">
                        <div class="h-full text-ellipsis">{{ data[fieldDisplay] }}</div> 
                    <slot classProp="msp-dropdown-item-icon" :value="value" name="item-icon"></slot></div>
                    <span v-if="showTooltip" class="msp-dropdown-item-custom-tooltip">{{ data[fieldDisplay] }}</span>
                </div>
            </template>
        </DxSelectBox>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //Gía trị của dropdown
            value:{},
            //Index của item đang được chọn
            currentIndex:null,
            //Ẩn hiện picker
            opened:false
        }
    },
    props: {
        //List item option
        data: {
            type: Array,
            required: true
        },
        //placeholder của dropdown
        placeholder: {
            type: String,
            default: "-Chọn-"
        },
        //độ dài
        width:String,
        //Xác nhận có show tooltip không
        showTooltip:{
            type:Boolean,
            default:true
        },
        //Field sẽ lấy giá trị
        fieldName:{
            type:String,
            required:true
        },
        //Field sẽ hiển thị
        fieldDisplay:{
            type:String,
            required:true
        },
        //Giá trị khởi tạo
        valueInit:Object,
        // Thông báo lỗi
        error:String,
        //tabindex
        tabIndex:Number,
        // Cho phép search không
        searchEnabled:{
            type:Boolean,
            default:true
        },
        //Cho phép arrow change value không
        allowArrowChangeValue:{
            type:Boolean,
            default:true
        }
    },
    created(){
        if(this.valueInit != null){
            this.value = this.valueInit
        }
    },
    watch:{
        valueInit(newValue){
            if(newValue){
                this.value = newValue
            }
        }
    },
    methods:{
        /**
         * Chọn item bằng click
         * Author : mhungwebdev (31/8/20222)
         * @param {*} e 
         */
        handleClickItem(e){
            const {itemIndex,itemData} = e
            this.currentIndex = itemIndex
            this.$emit('changeValue',itemData[this.fieldName])
            // this.opened = false
        },

        /**
         * Chọn item bằng keydown
         * Author : mhungwebdev (31/8/20222)
         * @param {*} e 
         */
        handleKeyDown(e){
            const key = e.event.key

            if(key == 'Enter')
                this.opened = true

            if(key == 'Escape')
                this.opened = false

            if(key == "ArrowDown"){
                if(this.currentIndex == this.data.length - 1)
                    this.currentIndex = 0
                else
                    this.currentIndex++
            }

            if(key == "ArrowUp"){
                if(this.currentIndex == 0)
                    this.currentIndex = this.data.length - 1
                else
                    this.currentIndex--
            }

            if(this.currentIndex && this.allowArrowChangeValue){
                this.$emit("changeValue",this.data[this.currentIndex][this.fieldName])
            }
        },

        /**
         * Blur dropdown
         * Author : mhungwebdev (2/9/20222)
         */
        handleBlur(){
            this.opened = false
            this.$emit('blurDropdown')
        },

        /**
         * Focus dropdown
         * Author : mhungwebdev (2/9/20222)
         */
        handleFocus(){
            this.opened = true
        },

        /**
         * Xử lý input
         * Author : mhungwebdev (6/9/20222)
         */
        handleInput(e){
            if(e.event.target.value == '')
                this.$emit("changeValue","")
        },
    }
}
</script>

<style scoped>
</style>