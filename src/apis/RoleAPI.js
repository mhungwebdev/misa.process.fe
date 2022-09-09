import BaseAPIConfig from "./BaseApiConfig";

class RoleAPI {
    controller = "Roles";

    /**
     * Lấy tất cả dữ liệu của role
     * Author : mhungwebdev (5/9/2022)
     * @returns tất cả dữ liệu role
     */
    getAllRole(){
        return BaseAPIConfig.get(`${this.controller}`)
    }
}
export default new RoleAPI();