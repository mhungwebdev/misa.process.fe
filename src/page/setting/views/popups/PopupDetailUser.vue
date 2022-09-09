<template>
    <BasePopup :showButtonGr="false" id="msp-popup-detail-user">
        <template #main>
            <div v-if="userDetail" class="msp-user-detail-wrapper w-full h-full">
                <div>
                    <div class="msp-icon-x msp-icon-v2 msp-icon-24 cursor-pointer pst-relative" @click="$emit('closeUserDetail')">
                    </div>
                    <div class="msp-tooltip-close">Đóng</div>
                </div>
                <div class="msp-user-detail-header flex">
                    <div class="msp-user-detail-header-left">
                        <div :style="{ backgroundColor: userDetail.AvatarColor }"
                            class="msp-user-detail-avatar border-circle flex-center">
                            {{ userDetail.AvatarText }}
                        </div>
                    </div>

                    <div class="msp-user-detail-header-right">
                        <div class="msp-user-detail-name">{{ userDetail.FullName }}</div>
                        <div class="msp-user-detail-email">{{ userDetail.Email }}</div>
                        <div class="msp-user-detail-active-status flex align-items-center">
                            <div :style="{ backgroundColor: userDetail.ActiveStatusColor }"
                                class="msp-user-detail-active-status-dot border-circle m-r-8"></div>
                            <div class="msp-user-detail-active-text"
                                :style="{ color: userDetail.ActiveStatusColor }">
                                {{ userDetail.ActiveStatusText }}
                            </div>
                        </div>
                        <div class="msp-user-detail-button-gr flex">
                            <BaseButton class="msp-user-detail-button" textColor="#ff6333" borderColor="#f90"
                                :type="TypeButton.OUTLINE" label="Cập nhật" @click="$emit('showFormEdit')" />

                            <BaseButton 
                                class="msp-user-detail-button" 
                                textColor="#ff6333" 
                                borderColor="#f90"
                                :type="TypeButton.OUTLINE" 
                                label="Xóa"
                                @click="$emit('deleteUser')" />
                        </div>
                    </div>
                </div>

                <div class="msp-user-detail-title">THÔNG TIN CÔNG VIỆC</div>
                <div class="msp-user-detail-field flex w-full">
                    <div class="msp-user-detail-label text-nowrap">Mã nhân viên</div>
                    <div class="msp-user-detail-value text-nowrap">{{ userDetail.EmployeeCode }}</div>
                </div>
                <div class="msp-user-detail-field  flex w-full">
                    <div class="msp-user-detail-label text-nowrap">Phòng ban</div>
                    <div class="msp-user-detail-value text-nowrap">{{ userDetail.DepartmentName }}</div>
                </div>
                <div class="msp-user-detail-field  flex w-full">
                    <div class="msp-user-detail-label text-nowrap">Vị trí công việc</div>
                    <div class="msp-user-detail-value text-nowrap">{{ userDetail.JobPositionName }}</div>
                </div>
                <div class="msp-user-detail-title">THÔNG TIN PHÂN QUYỀN</div>
                <div class="msp-user-detail-label-roles padding-vertical-16">Vai trò</div>
                <div class="msp-user-detail-roles">
                    <div v-for="(role, index) in userDetail.Roles" :key="index"
                        class="msp-user-detail-role padding-vertical-16 cursor-pointer">
                        {{ role?.RoleName }}
                    </div>
                </div>
            </div>

            <BaseLoading v-if="loading" />
        </template>
    </BasePopup>
</template>

<script>
import { TypeButton } from '../../../../Enum/Enum';
export default {
    props: {
        loading: Boolean,
        userDetail:{
            type:Object,
            required:true
        }
    },
    setup(){
        return {
            TypeButton
        }
    }
}
</script>

<style scoped>
@import url(../../../../css/page/setting/views/popups/PopupDetailUser.css);
</style>