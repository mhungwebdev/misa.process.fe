<template>
  <div class="msp-user-setting-container h-full flex flex-column">
    <div class="msp-user-setting-header flex align-items-center flex-between">
      <div class="msp-user-setting-title bold font-20">Nguời dùng</div>

      <BaseButton @click="isShowFormAdd = true" label="Thêm mới">
        <div class="msp-icon-plus-white msp-icon-v2 msp-icon-24"></div>
      </BaseButton>
    </div>

    <div class="msp-user-setting-grid">
      <div class="msp-user-grid-func flex align-items-center flex-between">
        <div class="msp-user-grid-func-left flex">
          <BaseInput
            @changeValue="handleSearch"
            placeholder="Tìm kiếm người dùng"
            :value="keyword"
            style="width: 240px; margin-right: 12px"
          >
            <div class="msp-icon msp-icon-24 msp-icon-search m-r-8"></div>
          </BaseInput>

          <BaseDropdown
            ref="roleFilter"
            @changeValue="handleFilterByRole"
            fieldName="RoleID"
            fieldDisplay="RoleName"
            :data="[
              { RoleName: 'Tất cả', RoleID: 'all' },
              ...$store.state.roles,
            ]"
            placeholder="Chọn vai trò"
            :searchEnabled="false"
            :tabIndex="-1"
            :allowArrowChangeValue="false"
          />
        </div>

        <div class="msp-user-grid-func-right pst-relative">
          <div
            id="msp-icon-setting-column"
            @click="handleShowSettingColumn"
            class="msp-user-grid-setting msp-icon-v2 msp-icon-24 cursor-pointer"
          ></div>
          <div class="msp-icon-setting-column-tooltip text-nowrap">
            Tùy chỉnh cột
          </div>
        </div>
      </div>

      <div class="msp-user-grid-table pst-relative">
        <BaseTable
          rowID="UserID"
          :data="users"
          :listFieldRender="listFieldUserRender"
          @editRow="handleShowEditUser"
          @deleteRow="handleShowConfirmDeleteUser"
          @handleRowDblClick="handleShowUserDetail"
        >
          <template #FullName="{ data }">
            <div class="msp-cell-full-name-custom flex align-items-center">
              <div
                :style="{ backgroundColor: data.value.avatarColor }"
                class="msp-cell-full-name-avatar msp-icon-32 border-circle flex-center"
              >
                {{ data.value.avatarText }}
              </div>
              <div
                :title="data.value.FullName"
                class="msp-cell-full-name-text text-ellipsis"
              >
                {{ data.value.FullName }}
              </div>
            </div>
          </template>

          <template #ActiveStatus="{ data }">
            <div class="msp-cell-active-status-custom flex align-items-center">
              <div
                :style="{ backgroundColor: data.value.color }"
                class="msp-cell-active-status-dot border-circle"
              ></div>
              <div
                :title="data.value.text"
                :style="{ color: data.value.color }"
                class="msp-cell-active-status-text text-ellipsis"
              >
                {{ data.value.text }}
              </div>
            </div>
          </template>
        </BaseTable>
        <BaseLoading v-if="loading" />
      </div>

      <!-- paging -->
      <div class="msp-user-paging flex-center flex-column">
        <div
          class="msp-user-paging-content w-full flex align-items-center flex-between"
        >
          <div class="msp-user-paging-content-left text-nowrap">
            Tổng số bản ghi : <b>{{ totalRecord }}</b>
          </div>

          <div class="msp-user-paging-content-right flex align-items-center">
            <div class="text-nowrap m-r-8">Số bản ghi trên trang</div>
            <BaseDropdown
              @changeValue="handleChangePageSize"
              fieldDisplay="pageSize"
              fieldName="pageSize"
              :valueInit="pageSize"
              :showTooltip="false"
              width="80px"
              :data="pageSizeOptions"
              :placeholder="15"
              :searchEnabled="false"
            >
              <template #item-icon="{ classProp }">
                <div :class="`${classProp} msp-icon-v2 msp-check`"></div>
              </template>
            </BaseDropdown>

            <div class="msp-user-paging-info text-nowrap">
              <b>{{ rowStart }}</b> - <b>{{ rowEnd }}</b> bản ghi
            </div>

            <div class="msp-user-paging-arrow-gr flex flex-between">
              <div class="msp-icon-36 flex-center msp-user-paging-arrow">
                <div
                  :style="{ opacity: rowStart == 1 ? '.6' : '' }"
                  class="msp-icon-v2 msp-icon-24 msp-icon-arrow-left cursor-pointer"
                  @click="
                    rowStart != 1 && handleChangePageNumber(pageNumber - 1)
                  "
                ></div>
                <div class="msp-user-paging-arrow-tooltip">Quay lại</div>
              </div>

              <div class="msp-icon-36 flex-center msp-user-paging-arrow">
                <div
                  :style="{ opacity: rowEnd == totalRecord ? '.6' : '' }"
                  class="msp-icon-v2 msp-icon-24 msp-icon-arrow-right cursor-pointer"
                  @click="
                    rowEnd != totalRecord &&
                      handleChangePageNumber(pageNumber + 1)
                  "
                ></div>
                <div class="msp-user-paging-arrow-tooltip">Tiếp tục</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Form setting column -->
    <PopupSettingColumn
      ref="settingColumn"
      :listFieldProp="listFieldUserRender"
      v-if="isShowSettingColumn"
      @getDefault="handleGetDefaultSettingColumn"
      @saveEditColumn="handleSaveSettingColumn"
      @closeEditColumn="isShowSettingColumn = false"
    />

    <!-- Popup confirm xóa -->
    <PopupConfirmDeleteUser
      v-if="nameUserDelete"
      @closePopupDelete="nameUserDelete = ''"
      @confirmDelete="handleDeleteUser"
      :nameUserDelete="nameUserDelete"
    />

    <!-- Popup Sửa -->
    <PopupEditUser
      v-if="isShowFormEdit"
      @closeEditUser="handleCloseFormEdit"
      @saveEditUser="listRoleEdit.length > 0 && handleSaveEdit()"
      :loading="isLoadingFormEdit"
      :userEdit="userDetail"
      :listRoleEdit="listRoleEdit"
      @changeListRole="handleChangeRoleEdit"
    />

    <!-- Popup thêm mới -->
    <PopupInsertMultiUser
      v-if="isShowFormAdd"
      @saveFormInsertMulti="handleSaveFormAdd"
      @closeFormAdd="isShowFormAdd = false"
      @reloadDataAfterInsert="handleReloadAfterInsert"
    />

    <!-- Detail user -->
    <PopupDetailUser
      v-if="isShowUserDetail"
      :loading="isLoadingUserDetail"
      @closeUserDetail="handleCloseUserDetail"
      @showFormEdit="isShowFormEdit = true"
      :userDetail="userDetail"
      @deleteUser="nameUserDelete = userDetail.FullName"
    />
  </div>
</template>

<script>
import BaseTable from "../../../components/BaseTable.vue";
import { Resource } from "../../../Resource/Resource";
import { CommonJS } from "../../../JS/CommonJS";
import PopupSettingColumn from "../views/popups/PopupSettingColumn.vue";
import PopupConfirmDeleteUser from "../views/popups/PopupConfirmDeleteUser.vue";
import PopupEditUser from "../views/popups/PopupEditUser.vue";
import PopupErrorForm from "../views/popups/PopupErrorForm.vue";
import PopupDetailUser from "../views/popups/PopupDetailUser.vue";
import PopupInsertMultiUser from "../views/popups/PopupInsertMultiUser.vue";
import UserAPI from "../../../apis/UserAPI";
import { TypeToast } from "../../../Enum/Enum";
import { User } from "../../../Entities/User";
import { Role } from "../../../Entities/Role";

export default {
  components: {
    BaseTable,
    PopupSettingColumn,
    PopupConfirmDeleteUser,
    PopupEditUser,
    PopupErrorForm,
    PopupDetailUser,
    PopupInsertMultiUser,
  },
  setup() {
    return {
      CommonJS,
      Resource,
    };
  },
  data() {
    return {
      //List field sẽ render
      listFieldUserRender: Resource.listFieldUserRender,
      //ẩn hiện setting column
      isShowSettingColumn: false,
      loading: false,
      //loading của form sửa
      isLoadingFormEdit: false,
      isLoadingUserDetail: false,
      isShowUserDetail: false,
      isShowFormEdit: false,
      //Dữ liệu user sẽ render
      users: [],
      //số bản ghi trên trang
      pageSize: 15,
      //trang hiện tại
      pageNumber: 1,
      //từ khóa tìm kiếm
      keyword: "",
      //roleID filter
      roleID: "",
      //tổng số bản ghi
      totalRecord: 0,
      //bản ghi bắt đầu
      rowStart: 0,
      //bản ghi kết thúc
      rowEnd: 0,
      //Option để chọn page size
      pageSizeOptions: [
        { pageSize: 15 },
        { pageSize: 25 },
        { pageSize: 50 },
        { pageSize: 100 },
      ],
      //timer dùng làm delay tìm kiếm
      timerSearch: null,
      //Tên người dùng muốn xóa
      nameUserDelete: "",
      //id của user đang được target
      idUserTarget: null,
      //Dữ liệu chi tiết người dùng
      userDetail: null,
      //Mảng role edit role cho user
      listRoleEdit: [],
      //Ẩn hiện form thêm mới
      isShowFormAdd: false,
    };
  },
  async created() {
    this.loading = true;
    await this.getUser();
    await this.$store.dispatch("getRole");
    this.loading = false;
  },

  methods: {
    /**
     * Lấy dữ liệu của user
     * Author : mhungwebdev (5/9/2022)
     */
    async getUser() {
      try {
        const { Data, RowEnd, RowStart, TotalRecord } = await (
          await UserAPI.filter(
            this.pageSize,
            this.pageNumber,
            this.keyword.trim(),
            this.roleID
          )
        ).data;
        this.users = this.handleDataUser(Data);
        this.rowEnd = RowEnd;
        this.totalRecord = TotalRecord;
        this.rowStart = RowStart;
      } catch (error) {
        console.log(error);
        this.$store.commit("showToast", {
          message: Resource.errorServer,
          type: TypeToast.ERROR,
        });
      }
    },

    /**
     * Xử lý dữ liệu user trả về để render
     * Author : mhungwebdev (5/9/2022)
     * @param {*} data dữ liệu user trả về từ server
     * @return mảng dữ liệu user đã được xử lý để render
     */
    handleDataUser(data) {
      return Array.from(data).map((user) => {
        return {
          ...user,
          FullName: {
            avatarColor: user.AvatarColor,
            avatarText: CommonJS.getAvatarText(user.FullName),
            FullName: user.FullName,
          },
          ActiveStatus: {
            color: user.ActiveStatusColor,
            text: user.ActiveStatusText,
          },
        };
      });
    },

    /**
     * Xử lý tìm kiếm với keyword
     * Author : mhungwebdev (5/9/2022)
     * @param keyword từ khóa tìm kiếm
     */
    async handleSearch(keyword) {
      this.keyword = keyword;
      if (this.timerSearch) {
        clearTimeout(this.timerSearch);
      }

      if (!this.keyword || this.keyword.trim()) {
        this.timerSearch = setTimeout(async () => {
          this.pageNumber = 1;
          await this.getUser();
        }, 500);
      }
    },

    /**
     * show confirm xóa user
     * Author : mhungwebdev (5/9/2022)
     * @param {*} userID của user muốn xóa
     */
    handleShowConfirmDeleteUser(userID) {
      const userDelete = this.users.find((user) => (user.UserID = userID));
      this.nameUserDelete = userDelete.FullName.FullName;
      this.idUserTarget = userID;
    },

    /**
     * Thay đổi role trong list role update
     * Author : mhungwebdev (5/9/2022)
     * @param {*} role tương tác với list role update
     */
    handleChangeRoleEdit(role) {
      if (this.listRoleEdit.find((r) => r.RoleID == role.RoleID)) {
        this.listRoleEdit = this.listRoleEdit.filter(
          (r) => r.RoleID != role.RoleID
        );
      } else {
        this.listRoleEdit = [...this.listRoleEdit, role];
      }
    },

    /**
     * Show form setting column
     * Author : mhungwebdev (27/8/2022)
     */
    handleShowSettingColumn() {
      this.isShowSettingColumn = !this.isShowSettingColumn;
      this.listFieldUserRenderSetting = JSON.parse(
        JSON.stringify(this.listFieldUserRender)
      );
    },

    /**
     * Lưu lại setting column
     * Author : mhungwebdev (27/8/2022)
     */
    handleSaveSettingColumn() {
      this.listFieldUserRender = this.$refs.settingColumn.listField;
      this.isShowSettingColumn = false;
    },

    /**
     * Lấy lại setting column ban đầu
     * Author : mhungwebdev (27/8/2022)
     */
    handleGetDefaultSettingColumn() {
      this.listFieldUserRender = Resource.listFieldUserRender;
      this.isShowSettingColumn = false;
    },

    /**
     * Thay đổi page size
     * Author : mhungwebdev (28/8/2022)
     * @param {*} pageSize kích thước trang muốn chuyển
     */
    async handleChangePageSize(pageSize) {
      this.loading = true;
      this.pageSize = pageSize;
      this.pageNumber = 1;
      await this.getUser();
      this.loading = false;
    },

    /**
     * Thay đổi page number
     * Author : mhungwebdev (28/8/2022)
     * @param {*} pageNumber trang muốn chuyển
     */
    async handleChangePageNumber(pageNumber) {
      this.loading = true;
      this.pageNumber = pageNumber;
      await this.getUser();
      this.loading = false;
    },

    /**
     * Filter theo role
     * Author : mhungwebdev (28/8/2022)
     * @param {*} roleID của role filter
     */
    async handleFilterByRole(roleID) {
      if (this.roleID == roleID) {
        this.$refs.roleFilter.value = {};
        roleID = "";
      }

      this.loading = true;
      this.pageNumber = 1;
      this.roleID = roleID;
      await this.getUser();
      this.loading = false;
    },

    /**
     * Xóa user
     * Author : mhungwebdev (31/8/20222)
     */
    async handleDeleteUser() {
      try {
        this.nameUserDelete = "";
        this.loading = true;
        await UserAPI.deleteUser(this.idUserTarget);
        await this.getUser();
        this.$store.commit("showToast", {
          message: Resource.deleteSuccess,
          type: TypeToast.SUCCESS,
        });
        this.userDetail = null;
        this.loading = false;
        this.isShowUserDetail = false;
        this.idUserTarget = null;
      } catch (error) {
        console.log(error);
        this.$store.commit("showToast", {
          message: Resource.errorServer,
          type: TypeToast.ERROR,
        });
      }
    },

    /**
     * Lưu form sửa role
     * Author : mhungwebdev (31/8/20222)
     */
    async handleSaveEdit() {
      this.isLoadingFormEdit = true;
      try {
        const listRoleUpdate = this.handleListRoleEdit();

        if (
          !CommonJS.compareTwoArray(
            listRoleUpdate,
            this.userDetail.Roles,
            "RoleID"
          )
        ) {
          await (
            await UserAPI.updateRole(this.userDetail.UserID, listRoleUpdate)
          ).data;
          await this.getUser();
          this.$store.commit("showToast", {
            message: Resource.updateSuccess,
            type: TypeToast.SUCCESS,
          });
        }
      } catch (e) {
        console.log(e);
        this.$store.commit("showToast", {
          message: Resource.errorServer,
          type: TypeToast.ERROR,
        });
      }

      this.userDetail = null;
      this.isLoadingFormEdit = false;
      this.isShowFormEdit = false;
      this.isShowUserDetail = false;
    },

    /**
     * Xử lý mảng role edit để thực hiện put
     * Author : mhungwebdev (5/9/2022)
     * @return list role update
     */
    handleListRoleEdit() {
      const listRoleUpdate = [];
      this.listRoleEdit.forEach((role) => {
        if (this.userDetail.Roles.find((r) => r.RoleID == role.RoleID)) {
          role["UpdateMode"] = 0;
          listRoleUpdate.push({ ...role, UpdateMode: 0 });
        } else {
          listRoleUpdate.push({ ...role, UpdateMode: 2 });
        }
      });

      this.userDetail.Roles.forEach((role) => {
        if (!this.listRoleEdit.find((r) => r.RoleID == role.RoleID)) {
          listRoleUpdate.push({ ...role, UpdateMode: 1 });
        }
      });

      return listRoleUpdate;
    },

    /**
     * show user detail
     * Author : mhungwebdev (2/9/2022)
     * @param {*} userID
     */
    async handleShowUserDetail(userID) {
      try {
        this.idUserTarget = userID;
        this.isLoadingUserDetail = true;
        this.isShowUserDetail = true;
        await this.getUserDetail(userID);
        this.initListRoleEdit(this.userDetail.Roles);
        this.isLoadingUserDetail = false;
      } catch (error) {
        console.log(error);
        this.isShowUserDetail = false;
        this.isLoadingUserDetail = false;
      }
    },

    /**
     * Đóng user detail
     * Author : mhungwebdev (2/9/2022)
     */
    handleCloseUserDetail() {
      this.userDetail = null;
      this.isShowUserDetail = false;
      this.listRoleEdit = [];
      this.idUserTarget = null;
    },

    /**
     * Mở form edit user
     * Author : mhungwebdev (3/9/2022)
     */
    async handleShowEditUser(userID) {
      this.isShowFormEdit = true;
      this.isLoadingFormEdit = true;
      this.idUserTarget = userID;
      try {
        await this.getUserDetail(userID);
        this.initListRoleEdit(this.userDetail.Roles);

        this.isLoadingFormEdit = false;
      } catch (error) {
        console.log(error);
        this.$store.commit("showToast", {
          message: Resource.errorServer,
          type: TypeToast.ERROR,
        });
        this.isShowFormEdit = false;
      }
    },

    /**
     * Lấy thông tin chi tiết của user
     * Author : mhungwebdev (5/9/2022)
     * @param userID id của user muốn lấy detail
     */
    async getUserDetail(userID) {
      const userDetail = await (await UserAPI.getUserByID(userID)).data;

      this.userDetail = new User(userDetail);
    },

    /**
     * Khởi tạo list role edit cho forn sửa role user
     * Author : mhungwebdev (5/9/2022)
     * @param {*} Roles dữ liệu role ban đầu của user
     */
    initListRoleEdit(Roles) {
      const listRoleInit = Roles.map((role) => {
        const { RoleID, RoleName } = role;
        return new Role(RoleID, RoleName);
      });

      this.listRoleEdit = listRoleInit;
    },

    /**
     * Đóng form Edit user
     * Author : mhungwebdev (3/9/2022)
     */
    handleCloseFormEdit() {
      if (!this.isShowUserDetail) {
        this.userDetail = null;
        this.listRoleEdit = [];
      }
      this.isShowFormEdit = false;
    },

    /**
     * Xử lý khi thêm mới thành công
     * Author : mhungwebdev (5/9/2022)
     */
    async handleReloadAfterInsert() {
      await this.getUser();
      this.isShowFormAdd = false;
    },
  },
};
</script>

<style scoped>
@import url(../../../css/page/setting/views/UserSettingPage.css);
</style>
