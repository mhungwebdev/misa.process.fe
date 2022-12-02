<template>
  <div
    class="msp-the-header-container flex flex-space-between align-items-center"
  >
    <div class="msp-the-header-left flex align-items-center">
      <div
        @click="isShowListApp = !isShowListApp"
        class="msp-icon-app-grey msp-icon-36 cursor-pointer"
      ></div>

      <a href="/process" class="msp-logo text-nowrap">Quy trình</a>

      <div class="msp-header-navigation flex align-items-center">
        <router-link
          v-for="(headerNavigate, index) in Resource.headerNavigates"
          :to="headerNavigate.path"
          :key="index"
          class="msp-header-navigation-item cursor-pointer"
        >
          <div class="msp-header-navigation-name text-nowrap">
            {{ headerNavigate.text }}
          </div>
          <div class="msp-header-navigation-active"></div>
        </router-link>

        <BaseButton class="pd-l-12" label="Chạy quy trình">
          <div class="msp-icon msp-icon-20 msp-icon-process"></div>
        </BaseButton>
      </div>
    </div>

    <div style="min-width: 100px" class="flex-1"></div>

    <div class="msp-the-header-right flex align-items-center">
      <BaseInput
        class="msp-global-search m-r-8"
        placeholder="Nhập ID, tiêu đề lượt chạy"
        value=""
      >
        <div class="msp-icon msp-icon-24 msp-icon-search"></div>
      </BaseInput>
      <div class="msp-icon-32 msp-icon-bell cursor-pointer">
        <div class="msp-icon-bell-bar">3</div>
      </div>

      <div @click="changeLocate" class="msp-header-avatar-wrapper flex-center">
        <div class="msp-header-avatar cursor-pointer"></div>
      </div>
    </div>

    <div v-if="isShowListApp" class="msp-the-header-app">
      <div
        class="msp-the-header-all-app h-full flex-center cursor-pointer flex-column"
      >
        <div class="msp-the-header-all-app-icon msp-icon-all-app"></div>
        <div class="msp-the-header-all-app-text">Tất cả</div>
      </div>

      <div class="msp-the-header-list-app flex flex-1">
        <div
          v-for="(app, index) in listApp"
          :key="index"
          class="msp-the-header-app-item h-full cursor-pointer"
        >
          <div
            :style="{ backgroundImage: `url(${app.appImage})` }"
            class="msp-the-header-app-icon"
          ></div>
          <div class="msp-the-header-all-app-text text-nowrap text-ellipsis">
            {{ app.appName }}
          </div>
          <div
            @click="changeFavoriteApp(index)"
            :class="{
              'msp-app-star': true,
              'msp-icon-24': true,
              'icon-star-default': !app.isFavorite,
              'icon-star-favorite': app.isFavorite,
            }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Resource } from "../Resource/Resource";
import { TypeButton } from "../Enum/Enum";
import { languages } from "../languages/languages";

export default {
  data() {
    return {
      isShowListApp: false,
      listApp: Resource.listApp,
      isExpanseAvatar: false,
    };
  },
  setup() {
    return {
      Resource,
      TypeButton,
    };
  },
  methods: {
    /**
     * Func : Thay toggle isFavorite của app
     * Author : mhungwebdev (27/8/2022)
     * @param {*} appIndex index của app
     */
    changeFavoriteApp(appIndex) {
      this.listApp = this.listApp.map((app, index) => {
        if (index == appIndex) {
          app.isFavorite = !app.isFavorite;
        }

        return app;
      });
    },

    changeLocate() {
      if (this.$root.$i18n.locale == "en") this.$root.$i18n.locale = "vn";
      else this.$root.$i18n.locale = "en";
    },
  },
};
</script>

<style scoped>
@import url(../css/layout/TheHeader.css);
</style>
