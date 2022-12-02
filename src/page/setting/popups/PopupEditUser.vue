<template>
    <BaseOverlay @keydown.esc="$emit('closeEditUser')">
        <BasePopup id="msp-popup-edit">
            <template #header>
                <div class="msp-popup-header flex align-items-center flex-between">
                    <div class="msp-popup-update-title">Sửa người dùng</div>

                    <div @click="$emit('closeEditUser')" class="msp-icon-close border-circle pst-relative flex-center">
                        <div class="msp-icon-x msp-icon-v2 msp-icon-24 cursor-pointer"></div>
                        <div class="msp-icon-close-tooltip">Đóng</div>
                    </div>
                </div>
            </template>

            <template #main>
                <div class="msp-edit-user">
                    <div class="msp-edit-user-info flex align-items-center">
                        <div :style="{ background: userEdit?.AvatarColor }"
                            class="msp-edit-user-avatar border-circle flex-center m-r-8">
                            {{ userEdit?.AvatarText }}
                        </div>

                        <div class="msp-edit-user-text">
                            <div class="msp-edit-user-name">
                                <b>{{ userEdit?.FullName }}</b> ({{ userEdit?.EmployeeCode
                                }})
                            </div>
                            <div class="msp-edit-user-email">{{ userEdit?.Email }}</div>
                            <div class="msp-edit-user-info-job">
                                {{ userEdit?.JobPositionName }} -
                                {{ userEdit?.DepartmentName }}
                            </div>
                        </div>
                    </div>
                    <br />
                    <div class="msp-edit-user-role-title">Vai trò <span class="text-red">*</span></div>
                    <br />
                    <div class="msp-list-user-list-role flex flex-between flex-wrap">
                        <div tabindex="1" class="tab-again"></div>
                        <BaseCheckbox 
                            v-for="(role, index) in $store.state.roles" 
                            :key="index" 
                            :itemCheckbox="role"
                            fieldDisplay="RoleName" 
                            :checked="isChecked(role?.RoleID)"
                            @click="$emit('changeListRole', role)" 
                            class="msp-role-item" 
                            :tabIndex="index+1"
                            @keydown.enter="$emit('changeListRole', role)"
                        />
                    </div>
                </div>
                <BaseLoading v-if="loading" />
            </template>

            <template #button-left>
                <BaseButton 
                    @click="$emit('closeEditUser')" 
                    class="msp-button-cancel" 
                    type="outline" 
                    :label="$t('message.textCancelButton')" 
                    :tabIndex="$store.state.roles.length + 2"
                    @keydown="handleKeyDownBtnCancel"
                />
            </template>

            <template #button-right>
                <BaseButton 
                    :tabIndex="$store.state.roles.length + 1"
                    :disable="listRoleEdit.length == 0"
                    @click="$emit('saveEditUser')" 
                    @keydown.enter="$emit('saveEditUser')"
                    class="msp-button-update"
                    :label="$t('message.textSaveForm')" />
            </template>
        </BasePopup>
    </BaseOverlay>
</template>

<script>
import { User } from '../../../Entities/User'
export default {
    props: {
        //loading edit user
        loading:Boolean,
        //Thông tin user
        userEdit:{
            type:User,
            required:true
        },
        // List những role được chọn
        listRoleEdit:{
            type:Array,
            required:true
        }
    },
    methods: {
        /**
         * Xác định đối tượng được check không
         * Author : mhungwebdev (6/9/2022)
         * @param {*} roleID 
         */
        isChecked(roleID) {
            if (Array.from(this.listRoleEdit).find(r => r.RoleID == roleID))
                return true
            else return false
        },

        /**
         * Keydown nút hủy
         * Author : mhungwebdev (6/9/2022)
         */
        handleKeyDownBtnCancel(e){
            if(e.key == 'Enter'){
                this.$emit('closeEditUser')
            }

            if(e.key == 'Tab'){
                document.getElementById("msp-popup-edit").querySelector(".tab-again[tabindex]").focus()
            }
        }
    }
}
</script>

<style scoped>
@import url('../../../css/page/setting/popups/PopupEditUser.css');
</style>