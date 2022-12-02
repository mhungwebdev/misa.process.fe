<template>
    <BaseOverlay @keydown="handleKeydownForm">
        <BasePopup id="msp-popup-insert-multi">
            <template #header>
                <div class="msp-popup-header flex align-items-center flex-between pst-relative">
                    <div class="msp-popup-insert-multi-title">Thêm người dùng</div>

                    <div @click="handleCloseFormAdd"
                        class="msp-icon-close border-circle pst-relative flex-center">
                        <div class="msp-icon-x msp-icon-v2 msp-icon-24 cursor-pointer"></div>
                        <div class="msp-icon-close-tooltip">Đóng</div>
                    </div>
                </div>
            </template>

            <template #main>
                <div v-if="listUserInsert.length > 0" class="msp-user-form-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th class="text-center">STT</th>
                                <th class="text-left">Mã nhân viên <span class="text-red">*</span></th>
                                <th class="text-left">Họ và tên <span class="text-red">*</span></th>
                                <th class="text-left">Phòng ban <span class="text-red">*</span></th>
                                <th class="text-left">Vị trí công việc <span class="text-red">*</span></th>
                                <th class="text-left">Email <span class="text-red">*</span></th>
                                <th class="text-left">Vai trò <span class="text-red">*</span></th>
                                <th class="text-left">Trạng thái <span class="text-red">*</span></th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(user, index) in listUserInsert" :key="user?.UserID">
                                <!-- STT -->
                                <td class="text-center">{{ index + 1 }}</td>

                                <!-- Mã nhân viên -->
                                <td class="text-left">
                                    <div v-if="index == 0" tabindex="1" class="tab-again"></div>
                                    <BaseInput 
                                        class="field-employee-code" 
                                        :initFocus="true" 
                                        :tabIndex="index * 7 + 1"
                                        :ref="`row${index}EmployeeCode`" 
                                        :error="user.ERROR.EmployeeCode"
                                        :value="user?.EmployeeCode" width="120px"
                                        @changeValue="value => changeValueUser('EmployeeCode',value, user?.UserID)"
                                        @blurInput="validateUser('EmployeeCode', user?.UserID)" />

                                    <div v-if="user.ERROR.EmployeeCode" class="msp-message-error"
                                        :title="user.ERROR.EmployeeCode">
                                        {{ user.ERROR.EmployeeCode }}
                                    </div>
                                </td>

                                <!-- Họ và tên -->
                                <td class="text-left">
                                    <BaseInput 
                                        :tabIndex="index * 7 + 2" 
                                        :error="user.ERROR.FullName"
                                        :value="user?.FullName" 
                                        width="160px"
                                        @changeValue="value => changeValueUser('FullName',value, user?.UserID)"
                                        @blurInput="validateUser('FullName', user?.UserID)" />

                                    <div v-if="user.ERROR.FullName" class="msp-message-error"
                                        :title="user.ERROR.FullName">
                                        {{ user.ERROR.FullName }}
                                    </div>
                                </td>

                                <!-- Phòng ban -->
                                <td class="text-left">
                                    <BaseDropdown 
                                        :tabIndex="index * 7 + 3" 
                                        :error="user.ERROR.DepartmentID"
                                        :data="$store.state.departments" 
                                        fieldDisplay="DepartmentName"
                                        fieldName="DepartmentID" 
                                        placeholder="" width="180px"
                                        @changeValue="value => changeValueUser('DepartmentID',value, user?.UserID)"
                                        @blurDropdown="validateUser('DepartmentID', user?.UserID)" />

                                    <div v-if="user.ERROR.DepartmentID" class="msp-message-error"
                                        :title="user.ERROR.DepartmentID">
                                        {{ user.ERROR.DepartmentID }}
                                    </div>
                                </td>

                                <!-- Vị trí công việc -->
                                <td class="text-left">
                                    <BaseDropdown 
                                        :tabIndex="index * 7 + 4" 
                                        :error="user.ERROR.JobPositionID"
                                        :data="$store.state.jobPositions" 
                                        fieldDisplay="JobPositionName"
                                        fieldName="JobPositionID" 
                                        placeholder="" 
                                        width="180px"
                                        @changeValue="value => changeValueUser('JobPositionID',value, user?.UserID)"
                                        @blurDropdown="validateUser('JobPositionID',user?.UserID)" />

                                    <div v-if="user.ERROR.JobPositionID" class="msp-message-error"
                                        :title="user.ERROR.JobPositionID">
                                        {{ user.ERROR.JobPositionID }}
                                    </div>
                                </td>

                                <!-- Email -->
                                <td class="text-left">
                                    <BaseInput 
                                        :tabIndex="index * 7 + 5" 
                                        :error="user.ERROR.Email" 
                                        :value="user?.Email"
                                        width="180px"
                                        @changeValue="value => changeValueUser('Email',value, user?.UserID)"
                                        @blurInput="validateUser('Email', user?.UserID)" />

                                    <div v-if="user.ERROR.Email" class="msp-message-error field-email"
                                        :title="user.ERROR.Email">
                                        {{ user.ERROR.Email }}
                                    </div>
                                </td>

                                <!-- Vai trò -->
                                <td class="text-left">
                                    <BaseTagBox 
                                        :tabIndex="index * 7 + 6" 
                                        :error="user.ERROR.Roles"
                                        :data="$store.state.roles" 
                                        fieldDisplay="RoleName" 
                                        fieldName="RoleID"
                                        width="240" placeholder=""
                                        @changeValue="value => changeValueUser('Roles',value, user?.UserID )"
                                        @blurTagBox="validateUser('Roles',user?.UserID)" />

                                    <div v-if="user.ERROR.Roles" class="msp-message-error" :title="user.ERROR.Roles">
                                        {{ user.ERROR.Roles }}
                                    </div>
                                </td>

                                <!-- Trạng thái -->
                                <td style="padding-right:60px" class="text-left">
                                    <BaseDropdown 
                                        :tabIndex="index * 7 + 7" 
                                        :error="user.ERROR.ActiveStatus"
                                        :data="Resource.ActiveStatusList" 
                                        fieldDisplay="ActiveStatusText"
                                        fieldName="ActiveStatus" 
                                        placeholder="" width="200px"
                                        @changeValue="value => changeValueUser('ActiveStatus',value,user?.UserID)"
                                        @blurDropdown="validateUser('ActiveStatus',user?.UserID)" />

                                    <div v-if="user.ERROR.ActiveStatus" class="msp-message-error"
                                        :title="user.ERROR.ActiveStatus">
                                        {{ user.ERROR.ActiveStatus }}
                                    </div>
                                </td>

                                <!-- Delete row -->
                                <td>
                                    <div v-if="listUserInsert.length > 1"
                                        @click="handleDeleteRow(index)"
                                        class="msp-cell-control border-circle flex-center cursor-pointer">
                                        <div class="msp-cell-control-delete msp-icon-24 msp-icon"></div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div @click="handleAddRow"
                        class="msp-user-form-add-row flex align-items-center cursor-pointer">
                        <div class="msp-user-form-add-row-icon"></div>
                        <div class="msp-user-form-add-row-text">Thêm dòng</div>
                    </div>
                </div>
                <BaseLoading v-if="loading" />
            </template>

            <template #button-left>
                <BaseButton 
                    @keydown="handleKeydownButtonCancelFormAdd"
                    @click="handleCloseFormAdd" 
                    class="msp-button-cancel" type="outline"
                    :label="$t('message.textCancelButton')" 
                    :tabIndex="listUserInsert.length * 7 + 2" 
                    />
            </template>

            <template #button-right>
                <BaseButton 
                    @keydown.enter="handleSaveForm" 
                    @click="handleSaveForm"
                    class="m-r-24" 
                    :label="$t('message.textSaveForm')" 
                    :tabIndex="listUserInsert.length * 7 + 1" 
                />
            </template>
        </BasePopup>

        <!-- Popup lỗi form -->
        <PopupErrorForm 
            v-if="isShowPopupErrorForm" 
            :errorMsg="$t('message.errorForm')"
            @closeErrorForm="handleCloseErrorFormAdd" 
        />

        <!-- Confirm close form insert multi -->
        <PopupConfirmCloseForm 
            v-if="isShowConfirmCloseForm" 
            @closePopup="isShowConfirmCloseForm = false"
            @closeForm="$emit('closeFormAdd')"
            @saveForm="() => {isShowConfirmCloseForm = false; handleSaveForm()}"
        />
    </BaseOverlay>
</template>

<script>
import { nextTick } from "vue";
import UserAPI from "../../../apis/UserAPI";
import { UserInsert } from "../../../Entities/User";
import { TypeToast } from "../../../Enum/Enum";
import { CommonJS } from "../../../JS/CommonJS";
import {Resource} from "../../../Resource/Resource"
import PopupErrorForm from "./PopupErrorForm.vue";
import PopupConfirmCloseForm from "./PopupConfirmCloseForm.vue";
export default {
    components: { PopupErrorForm, PopupConfirmCloseForm },
    data() {
        return {
            //Mảng user insert
            listUserInsert: [],
            //Ẩn hiện popup error form
            isShowPopupErrorForm: false,
            // loading form insert multi
            loading: false,
            // Ẩn hiện popup confirm close form
            isShowConfirmCloseForm: false,
        };
    },
    setup() {
        return {
            Resource,
        };
    },
    async created() {
        this.loading = true;
        await this.initFormInsertMulti();
        this.loading = false;
    },
    methods: {
        /**
         * Khởi tạo cho form thêm mới
         * Author : mhungwebdev (5/9/2022)
         */
        async initFormInsertMulti() {
            try {
                const newEmployeeCode = await (await UserAPI.getNewEmployeeCode()).data;
                this.listUserInsert = [new UserInsert(newEmployeeCode)];
                await this.$store.dispatch("getDepartments");
                await this.$store.dispatch("getJobPositions");
            }
            catch (e) {
                console.log(e);
                this.$store.commit("showToast", { message: Resource.errorServer, type: TypeToast.ERROR });
            }
        },

        /**
         * Xử lý sự kiện keydown form
         * Author : mhungwebdev (2/9/2022)
         */
        handleKeydownForm(e) {
            if (e.key.toLowerCase() == "s" && e.ctrlKey) {
                e.preventDefault();
                this.handleSaveForm();
            }
            if (e.key == "Escape") {
                if (e.target.className != "dx-texteditor-input")
                    this.handleCloseFormAdd()
            }
        },

        /**
        * tabindex quay đầu
        * Author : mhungwebdev (2/9/2022)
        * @param {*} e
        */
        handleKeydownButtonCancelFormAdd(e) {
            if (e.key == "Tab") {
                nextTick(() => {
                    document.querySelector("#msp-popup-insert-multi").querySelector("div[tabindex]").focus();
                });
            }
            if (e.key == "Enter") {
                this.handleCloseFormAdd()
            }
        },

        /**
         * Thay đổi giá trị của user insert
         * Author : mhungwebdev (1/9/2022)
         * @param {*} fieldName tên field thay đổi giá trị
         * @param {*} value giá trị thay đổi
         * @param {*} id của user thay đổi giá trị
         */
        changeValueUser(fieldName, value, id) {
            const userChange = this.listUserInsert.find(user => user.UserID == id);
            if(userChange){
                userChange.ERROR[fieldName] = "";
                if (fieldName != "Roles") {
                    if(fieldName == "FullName")
                        userChange["FullName"] = CommonJS.memberCasingText(value);
                    else
                        userChange[fieldName] = value;
                }
                else {
                    const roles = this.$store.state.roles.filter(role => value.includes(role.RoleID));
                    userChange["Roles"] = roles;
                }
            }
        },

        /**
         * Validate user
         * Author : mhungwebdev (1/9/2022)
         * @param {*} fieldName tên field muốn validate
         * @param {*} id của user muốn validate
         */
        async validateUser(fieldName, id) {
            try {
                const userValidate = this.listUserInsert.find(user => user.UserID == id);
                
                if(userValidate){
                    let isValid = userValidate.validate(fieldName);
                    if (fieldName == "EmployeeCode" && this.checkEmployeeCode(userValidate.EmployeeCode,userValidate.UserID)) {
                        userValidate.ERROR["EmployeeCode"] = Resource.employeeCodeExist;
                        isValid = false;
                    }
                    return isValid;
                }
            }
            catch (error) {
                console.log(error);
            }
        },

        /**
        * Xóa bỏ user khỏi mảng insert
        * Author : mhungwebdev (1/9/2022)
        * @param {*} rowIndex index của row muốn xóa
        */
        handleDeleteRow(rowIndex) {
            this.listUserInsert.splice(rowIndex, 1);
        },

        /**
        * Kiểm tra employee code đã tồn tại trong mảng chưa
        * Author : mhungwebdev (1/9/2022)
        * @param {*} employeeCode mã nhân viên muốn check
        * @param {*} id của user muốn check
        * @returns true nếu đã tồn tại - false nếu chưa tồn tại
        */
        checkEmployeeCode(employeeCode, id = null) {
            const checkExist = this.listUserInsert.find(user => user.EmployeeCode == employeeCode && user.UserID != id);
            if (checkExist)
                return true;
            else
                return false;
        },

        /**
         * Thêm mới row
         * Author: mhungwebdev (1/9/2022)
         */
        async handleAddRow() {
            try {
                let newEmployeeCode = await (await UserAPI.getNewEmployeeCode()).data;
                let checkExist = this.checkEmployeeCode(newEmployeeCode);
                while (checkExist) {
                    newEmployeeCode = `NV-${CommonJS.getNumberFormEmployeeCode(newEmployeeCode) + 1}`;
                    checkExist = this.checkEmployeeCode(newEmployeeCode);
                }

                this.listUserInsert = [...this.listUserInsert, new UserInsert(newEmployeeCode)];
            }
            catch (e) {
                console.log(e);
                this.$store.commit("showToast", { message: Resource.errorServer, type: TypeToast.ERROR });
            }
        },

        /**
         * Validate list user insert
         * Author : mhungwebdev (5/9/2022)
         * @return true nếu mảng user insert không có lỗi - false nếu ngược lại
         */
        async validateListUserInsert() {
            let canSave = true;
            for (let i = 0; i < this.listUserInsert.length; i++) {
                for (const key in this.listUserInsert[i]) {
                    if (key != "ERROR") {
                        let isValid = await this.validateUser(key, this.listUserInsert[i]?.UserID);
                        if (!isValid)
                            canSave = false;
                    }
                }
            }
            return canSave;
        },

        /**
         * Xử lý thêm mới hàng loạt
         * Author : mhungwebdev (5/9/2022)
         */
        async handleSaveForm() {
            try {
                this.loading = true;
                const canSave = await this.validateListUserInsert();
                if (canSave) {
                    const res = await (await UserAPI.insertMulti(this.listUserInsert)).data;
                    this.$store.commit("showToast", { message: Resource.insertSuccess(res), type: TypeToast.SUCCESS });
                    await this.$emit("reloadDataAfterInsert");
                    this.loading = false;
                }
                else {
                    this.isShowPopupErrorForm = true;
                    this.loading = false;
                }
            }
            catch (e) {
                this.loading = false;
                console.log(e);
                if (e && e.response && e.response.status == 400 && e.response.data.errors)
                    this.handleErrorServer(e.response.data.errors);
                else {
                    this.$store.commit("showToast", { message: Resource.errorServer, type: TypeToast.ERROR });
                }
            }
        },

        /**
         * Xử lý lỗi dữ liệu trả về từ server
         * Author : mhungwebdev (5/9/2022)
         * @param errors Mảng lỗi của list user
         */
        handleErrorServer(errors) {
            errors.forEach(error => {
                const { UserID, fieldError } = error;
                const userError = this.listUserInsert.find(user => user.UserID === UserID);
                userError.ERROR = { ...userError.ERROR, ...fieldError };
            });
            this.isShowPopupErrorForm = true;
        },

        /**
        * Xử lý confirm error form
        * Author : mhungwebdev (2/9/2022)
        */
        handleCloseErrorFormAdd() {
            try {
                const fieldError = document.querySelector(".msp-border-field-error")
                nextTick(() => {
                    fieldError.querySelector("input[tabindex]").focus()
                })
                this.isShowPopupErrorForm = false
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Kiểm tra form có dữ liệu không
         * Author : mhungwebdev (6/9/2022)
         * @return true nếu form có dữ liệu - false nếu ngược lại
         */
        checkDataForm(){
            if(this.listUserInsert.length > 1)
                return true
            else{
                const userInsert = this.listUserInsert[0]
                for (const key in userInsert) {
                    if(key != 'EmployeeCode' && key != 'AvatarColor' && key != 'Roles' && key != 'ActiveStatus' && userInsert[key] && key != 'UserID' && key != 'ERROR')
                        return true

                    if(key == 'Roles' && userInsert[key].length > 0)
                        return true
                    if(key == 'ActiveStatus' && userInsert[key] != null)
                        return true
                }
            }

            return false
        },

        /**
         * Xử lý khi click x hoặc hủy
         * Author : mhungwebdev (6/9/2022)
         */
        handleCloseFormAdd(){
            if(this.checkDataForm()){
                this.isShowConfirmCloseForm = true
            }else
                this.$emit('closeFormAdd')
        }
    },
}
</script>

<style scoped>
@import url('../../../css/page/setting/popups/PopupInsertMultiUser.css');
</style>