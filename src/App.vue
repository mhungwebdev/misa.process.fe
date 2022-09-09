<template>
  <div class="msp-container flex flex-column">
    <TheHeader />
    <BaseToast v-if="$store.state.isShowToast" :message="$store.state.toastMsg" :type="$store.state.typeToast" />
    <div class="msp-page-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TheHeader from './layout/TheHeader.vue';
import BaseToast from './components/BaseToast.vue';
import { TypeToast } from './Enum/Enum';

  export default {
    components: { TheHeader, BaseToast },
    setup(){
      return {
        TypeToast
      }
    }
}
</script>

<style scoped>
@import url(./css/layout/App.css);
</style>
