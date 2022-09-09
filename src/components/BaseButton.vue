<template>
  <div
    ref="button"
    :tabindex="tabIndex"
    :class="{
      'msp-button': true,
      flex: true,
      'align-items-center': true,
      'msp-button-contain': type == TypeButton.CONTAIN,
      'msp-button-outline': type == TypeButton.OUTLINE,
      'msp-button-disable': disable,
    }"
    :style="{
      backgroundColor: bgColor,
      color: textColor,
      width: width,
      height: height,
      fontSize: fontSize,
      borderRadius: borderRadius,
      borderColor: borderColor,
    }"
  >
    <slot></slot>
    <div class="msp-button-label">{{ label }}</div>
    <div v-if="tooltip" class="msp-button-tooltip">{{ tooltip }}</div>
  </div>
</template>

<script>
import { TypeButton } from "../Enum/Enum";
export default {
  setup() {
    return {
      TypeButton,
    };
  },
  props: {
    //label button
    label: {
      type: String,
      default: "Label",
    },
    //màu button
    bgColor: String,
    //màu chữ label
    textColor: String,
    //độ rộng
    width: String,
    //độ cao
    height: String,
    //font size label
    fontSize: String,
    //border radius
    borderRadius: String,
    //border color
    borderColor: String,
    tabIndex: {
      type: Number,
      default: 0,
    },
    //kiểu button
    type: {
      type: String,
      default: TypeButton.CONTAIN,
    },
    //Tooltip của button
    tooltip: String,
    //Trạng thái có bấm được không
    disable: {
      type: String,
      default: false,
    },
    //khởi tạo focus
    focus:Boolean,
  },
  mounted(){
    if(this.focus)
      this.$refs.button.focus()
  }
};
</script>

<style scoped>
@import url(../css/components/button.css);
</style>