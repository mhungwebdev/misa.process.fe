import { v4 as uuidv4 } from 'uuid';
import { CommonJS } from "../JS/CommonJS";
import { ValidateGeneral } from "../JS/ValidateGeneral";
import { Role } from "./Role";

/**
 * Lưu trữ thông tin user
 * Author : mhungwebdev (5/9/2022)
 */
export class User {
    ///Id của user
    UserID
    ///Mã nhân viên
    EmployeeCode
    ///Tên nhân viên
    FullName
    ///Email
    Email
    ///Màu avatar
    AvatarColor
    ///Tên phòng ban
    DepartmentName
    ///Tên vị trí công việc
    JobPositionName
    ///List role của user
    Roles
    ///Text trên avatar
    AvatarText
    ///Trạng thái hiển thị dạng text
    ActiveStatusText
    ///Màu dành cho trạng thái
    ActiveStatusColor

    constructor(userDetail) {
        this.UserID = userDetail.UserID;
        this.EmployeeCode = userDetail.EmployeeCode;
        this.FullName = userDetail.FullName;
        this.Email = userDetail.Email;
        this.AvatarColor = userDetail.AvatarColor;
        this.DepartmentName = userDetail.DepartmentName;
        this.JobPositionName = userDetail.JobPositionName;
        const initRoles = userDetail.Roles.map(role => {
            const newRole = new Role(role?.RoleID, role.RoleName)
            newRole["UpdateMode"] = 0
            return newRole
        })
        this.Roles = JSON.parse(JSON.stringify(initRoles))
        this.AvatarText = CommonJS.getAvatarText(userDetail.FullName)
        this.ActiveStatusText = userDetail.ActiveStatusText;
        this.ActiveStatusColor = userDetail.ActiveStatusColor;
    }
}

/**
 * Lưu trữ thông tin cho user insert
 * Author mhungwebdev (11/9/2022)
 */
export class UserInsert {
    ///Id người dùng
    UserID
    ///Mã nhân viên
    EmployeeCode
    /// Tên nhân viên
    FullName
    /// Email
    Email
    /// Màu avatar
    AvatarColor
    /// Id phòng ban
    DepartmentID
    /// Id vị trí công việc
    JobPositionID
    /// Tole của user
    Roles
    /// Trạng thái kiểu number
    ActiveStatus
    /// Đối tượng lưu trữ lỗi
    ERROR

    constructor(employeeCode) {
        this.UserID = uuidv4();
        this.EmployeeCode = employeeCode;
        this.FullName = "";
        this.Email = "";
        this.AvatarColor = CommonJS.randomColor();
        this.DepartmentID = "";
        this.JobPositionID = "";
        this.Roles = []
        this.ActiveStatus = null;
        this.ERROR = {
            EmployeeCode: "",
            FullName: "",
            Email: "",
            DepartmentID: "",
            JobPositionID: "",
            Roles: "",
            ActiveStatus: "",
        }
    }

    /**
     * Validate user insert
     * Author : mhungwebdev (1/9/2022)
     * @param {*} fieldName field validate 
     * @param {*} value dữ liệu của field
     * @returns true nếu thỏa mãn - false nếu ngược lại
     */
    validate(fieldName) {
        let isValid = true
        if (fieldName != "Roles" && fieldName != "ActiveStatus") {
            isValid = ValidateGeneral.validateRequired(this, fieldName, isValid);
            isValid = ValidateGeneral.validateEmail(this, 'Email', isValid);
        } else if (fieldName == "Roles") {
            isValid = ValidateGeneral.validateArrayRequired(this, fieldName, isValid);
        } else if (fieldName == "ActiveStatus") {
            isValid = ValidateGeneral.validateFieldNotNull(this, fieldName, isValid);
        }

        return isValid
    }
}