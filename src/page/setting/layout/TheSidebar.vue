<template>
  <div class="msp-the-sidebar-container">
    <router-link
      v-for="(sidebarItem, index) in Resource.sidebarSettingNavigates"
      :to="sidebarItem.path"
      :key="index"
      class="msp-sidebar-item flex align-items-center"
    >
      <div
        :class="`msp-icon msp-icon-24 msp-sidebar-item-icon ${sidebarItem.classIcon}`"
      ></div>
      <div class="msp-sidebar-item-text">{{ sidebarItem.text }}</div>
    </router-link>
  </div>
</template>

<script>
import { Resource } from "../../../Resource/Resource";
export default {
  setup() {
    return {
      Resource,
    };
  },
};
</script>

<style scoped>
@import url(../../../css/page/setting/layout/TheSidebar.css);
</style>