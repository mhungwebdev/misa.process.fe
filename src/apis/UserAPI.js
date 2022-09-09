import BaseAPIConfig from "./BaseApiConfig";

class UserAPI {
    controller = "Users";

    /**
     * Filter user
     * Author : mhungwebdev (5/9/2022)
     * @param {*} pageSize Số bản ghi trên trang
     * @param {*} pageNumber trang hiện tại
     * @param {*} keyword từ khóa tìm kiếm
     * @param {*} roleID của role muốn filter
     * @returns {
     *  TotalRecord : Tổng số bản ghi;
     *  RowStart : Bản ghi bắt đầu;
     *  RowEnd : Bản ghi kết thúc;
     *  CurrentPage : Trang hiện tại;
     *  data : Dữ liệu người dùng
     * }
     */
    filter(pageSize,pageNumber,keyword,roleID){
        let filterQuery = `filter?pageSize=${pageSize}&pageNumber=${pageNumber}`
        if (keyword)
            filterQuery += `&keyword=${keyword}`;
        if (roleID && roleID != "all")
            filterQuery += `&roleID=${roleID}`;
        return BaseAPIConfig.get(`${this.controller}/${filterQuery}`)
    }

    /**
     * Lấy mã nhân viên mới
     * Author : mhungwebdev (5/9/2022)
     * @returns mã nhân viên mới
     */
    getNewEmployeeCode(){
        return BaseAPIConfig.get(`${this.controller}/NewEmployeeCode`)
    }

    /**
     * Lấy thông tin user theo id
     * Author : mhungwebdev (5/9/2022)
     * @param {*} userID 
     * @returns thông tin chi tiết user
     */
    getUserByID(userID){
        return BaseAPIConfig.get(`${this.controller}/${userID}`)
    }

    /**
     * Xóa người dùng
     * Author : mhungwebdev (5/9/2022)
     * @param {*} userID người dùng muốn xóa
     * @returns Số bản ghi xóa thành công
     */
    deleteUser(userID){
        return BaseAPIConfig.delete(`${this.controller}/${userID}`)
    }

    /**
     * Update role cho user
     * Author : mhungwebdev (5/9/2022)
     * @param {*} userID id của user muốn update role
     * @param {*} listRoleUpdate list role sẽ xử lý update
     * @returns số bản ghi update thành công
     */
    updateRole(userID,listRoleUpdate){
        return BaseAPIConfig.put(`${this.controller}/UpdateRole/${userID}`,listRoleUpdate)
    }

    /**
     * Thêm mới hàng loạt user
     * Author : mhungwebdev (5/9/2022)
     * @param {*} listUserInsert 
     * @returns số bản ghi thêm mới thành công
     */
    insertMulti(listUserInsert){
        return BaseAPIConfig.post(`${this.controller}/InsertMulti`,listUserInsert)
    }
}
export default new UserAPI();