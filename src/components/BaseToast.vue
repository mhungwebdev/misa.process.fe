<template>
    <div :class="`msp-toast-wrapper msp-toast-${type} flex align-items-center`">
        <div class="msp-toast-icon msp-icon-image msp-icon-24"></div>
        <div class="msp-toast-msg">{{message}}</div>
    </div>
</template>

<script>
import { TypeToast } from '../Enum/Enum'
    export default {
        props:{
            //kiểu của toast
            type:{
                type:String,
                default:TypeToast.SUCCESS
            },
            //thông báo toast
            message:{
                type:String,
                default:"Message"
            }
        }
    }
</script>

<style scoped>
@import url(../css/components/toast.css);
</style>