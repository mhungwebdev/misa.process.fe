import BaseAPIConfig from "./BaseApiConfig";

class JobPositionAPI {
    controller = "JobPositions";

    /**
     * Lấy tất cả dữ liệu của job position
     * Author : mhungwebdev (5/9/2022)
     * @returns tất cả dữ liệu của job position
     */
    getAllJobPosition(){
        return BaseAPIConfig.get(`${this.controller}`)
    }
}
export default new JobPositionAPI();