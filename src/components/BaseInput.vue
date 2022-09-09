<template>
  <div 
    :style="{width:width}" 
    :class="`msp-input-container flex ${isFocus ? 'msp-input-container-focus' : ''} ${error ? 'msp-border-field-error' : ''}`">
    <slot></slot>
    <input
      :tabindex="tabIndex"
      :placeholder="placeholder"
      :value="value"
      :type="type"
      @input="handleChangeValue"
      @blur="handleBlurInput"
      @focus="handleFocusInput"
      class="msp-input h-full flex-1 w-full"
      ref="input"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      //xác định input được focus không
      isFocus: false,
    };
  },
  props: {
    placeholder: String,
    //giá trị input
    value: {
      type: String,
      required: true,
    },
    //độ dài
    width: String,
    tabIndex: {
      type: Number,
      default: 0,
    },
    //độ cao
    height: String,
    borderRadius: String,
    borderColor: String,
    //kiểu của input
    type: {
      type: String,
      default: "text",
    },
    //thông báo lỗi
    error: String,
    //xác định focus khi input được khởi tạo
    initFocus: Boolean,
  },
  mounted(){
    if(this.initFocus)
      this.$refs.input.focus();
  },
  methods: {
    /**
     * Func : Lắng nghe sự kiện thay đổi dữ liệu
     * Author : mhungwebdev (27/8/2022)
     */
    handleChangeValue(e) {
      this.$emit('changeValue',e.target.value)
    },

    /**
     * Func : Lắng nghe sự kiện blur input
     * Author : mhungwebdev (27/8/2022)
     */
    handleBlurInput(e) {
      this.isFocus = false;
      this.$emit('blurInput',e.target.value)
    },

    /**
     * Func : Lắng nghe sự kiện focus input
     * Author : mhungwebdev (27/8/2022)
     */
    handleFocusInput(){
      this.isFocus = true;
    }
  }
};
</script>

<style scoped>
@import url(../css/components/input.css);
</style>