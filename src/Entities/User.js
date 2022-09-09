import { CommonJS } from "../JS/CommonJS";
import { Role } from "./Role";
import { v4 as uuidv4 } from 'uuid';
import { Resource } from "../Resource/Resource";

export class User {
    constructor(userDetail) {
        this.UserID = userDetail.UserID;
        this.EmployeeCode = userDetail.EmployeeCode;
        this.FullName = userDetail.FullName;
        this.Email = userDetail.Email;
        this.AvatarColor = userDetail.AvatarColor;
        this.DepartmentName = userDetail.DepartmentName;
        this.JobPositionName = userDetail.JobPositionName;
        const initRoles = userDetail.Roles.map(role => {
            const newRole = new Role(role?.RoleID,role.RoleName)
            newRole["UpdateMode"] = 0
            return newRole
        })
        this.Roles = JSON.parse(JSON.stringify(initRoles))
        this.AvatarText = CommonJS.getAvatarText(userDetail.FullName)
        this.ActiveStatusText = userDetail.ActiveStatusText;
        this.ActiveStatusColor = userDetail.ActiveStatusColor;
    }
}

export class UserInsert {
    constructor(employeeCode){
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
            EmployeeCode:"",
            FullName:"",
            Email:"",
            DepartmentID:"",
            JobPositionID:"",
            Roles:"",
            ActiveStatus:"",
        }
    }

    /**
     * Validate user insert
     * Author : mhungwebdev (1/9/2022)
     * @param {*} fieldName field validate 
     * @param {*} value dữ liệu của field
     * @returns true nếu thỏa mãn - false nếu ngược lại
     */
    validate(fieldName){
        let isValid = true
        if(fieldName != "Roles" && fieldName != "ActiveStatus"){
            if(this[fieldName] == "" || this[fieldName] == null){
                this.ERROR[fieldName] = Resource.emptyFieldRequire
                isValid = false
            }else{
                if(fieldName == "Email" && !CommonJS.ValidateEmail(this[fieldName])){
                    this.ERROR["Email"] = Resource.emailInvalid
                    isValid = false
                }
            }
        }else if(fieldName == "Roles"){
            if(this[fieldName].length == 0){
                this.ERROR[fieldName] = Resource.notChoseRole
                isValid = false
            }
        }else if(fieldName == "ActiveStatus"){
            if(this[fieldName] == null){
                this.ERROR["ActiveStatus"] = Resource.emptyFieldRequire
                isValid = false
            }
        }

        return isValid
    }
}