import BaseAPIConfig from "./BaseApiConfig";

class DepartmentAPI {
    controller = "Departments";

    /**
     * Lấy tất cả dữ liệu của department
     * Author : mhungwebdev (5/9/2022)
     * @returns tất cả dữ liệu của department
     */
    getAllDepartment(){
        return BaseAPIConfig.get(`${this.controller}`)
    }
}
export default new DepartmentAPI();