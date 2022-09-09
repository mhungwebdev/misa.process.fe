import { createStore } from 'vuex'
import { Resource } from '../Resource/Resource';
import { TypeToast } from '../Enum/Enum'
import { Role } from '../Entities/Role';
import RoleAPI from '../apis/RoleAPI';
import DepartmentAPI from '../apis/DepartmentAPI';
import JobPositionAPI from '../apis/JobPositionAPI';

// Create a new store instance.
export const store = createStore({
  state() {
    return {
      //Dữ liệu roles
      roles: [],
      //Ẩn hiện toast
      isShowToast: false,
      //Message toast
      toastMsg: "",
      //kiểu của toast
      typeToast: TypeToast.SUCCESS,
      //Dữ liệu phòng ban
      departments:[],
      //Dữ liệu vị trí công việc
      jobPositions:[],
      timerToast:null
    }
  },

  mutations: {
    /**
     * Show toast message
     * Author : mhungwebdev (31/8/2022)
     * @param {*} state 
     */
    showToast(state, { message, type }) {
      state.toastMsg = message
      state.typeToast = type
      state.isShowToast = true

      if(state.timerToast)
        clearTimeout(state.timerToast)

      setTimeout(() => {
        state.isShowToast = false
      }, 3000)
    },
  },

  actions: {
    /**
     * Lấy dữ liệu role
     * Author : mhungwebdev (28/8/2022)
     * @param {*} state 
     */
    async getRole({ state, commit }) {
      try {
        const roles = await (await RoleAPI.getAllRole()).data
        const rolesInit = roles.map(role => new Role(role.RoleID, role.RoleName))
        state.roles = rolesInit
      } catch (e) {
        console.log(e)
        commit("showToast", { message: Resource.errorServer, type: TypeToast.ERROR })
      }
    },

    async getDepartments({state}){
      const departmentSession = JSON.parse(sessionStorage.getItem("departments"));
      if(departmentSession){
        state.departments = departmentSession
      }else{
        state.departments = await (await DepartmentAPI.getAllDepartment()).data
        sessionStorage.setItem('departments',JSON.stringify(state.departments));
      }
    },

    async getJobPositions({state}){
      const jobPositionSession = JSON.parse(sessionStorage.getItem("jobPositions"));
      if(jobPositionSession){
        state.jobPositions = jobPositionSession
      }else{
        state.jobPositions = await (await JobPositionAPI.getAllJobPosition()).data
        sessionStorage.setItem('jobPositions',JSON.stringify(state.jobPositions));
      }
    },
  }
})