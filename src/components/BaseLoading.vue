<template>
    <div class="msp-loading w-full h-full flex-center">
        <div :style="{borderColor:loadingColor}" class="msp-icon-loading"></div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                //Màu của loading
                loadingColor:"steelblue",
                //Dùng để gắn sự kiện thay đổi màu
                timerChangeColor:null,
                //Mảng màu random cho loading
                colorRandom:["Steelblue", "tomato","yellowgreen","slateblue","purple"],
            }
        },

        created(){
            this.timerChangeColor = setInterval(() => {
                this.loadingColor = this.colorRandom[Math.floor(Math.random()*4)];
            },800)
        },

        unmounted(){
            clearInterval(this.timerChangeColor)
        }
    }
</script>

<style scoped>
@import url(../css/components/loading.css);
</style>