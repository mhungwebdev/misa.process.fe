<template>
    <div class="msp-setting-page-container flex h-full">
        <TheSidebar />
        <div class="msp-setting-grid">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import TheSidebar from './layout/TheSidebar.vue';
    export default {
    components: { TheSidebar }
}
</script>

<style scoped>
@import url(../../css/page/setting/SettingPage.css);
</style>