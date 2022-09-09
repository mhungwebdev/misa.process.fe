import ImageProcess from "../assets/icon/process.svg"
import ImageNewFeed from "../assets/icon/newsfeed.svg"
import ImagePayroll from "../assets/icon/payroll.svg"
import ImageSystem from "../assets/icon/system.svg"
import ImageEmployee from "../assets/icon/employees.svg"
import ImageTask from "../assets/icon/task.svg"
import ImageRecruit from "../assets/icon/recruit.svg"
import ImageWeSign from "../assets/icon/wesign.svg"
import ImageEmployeeSelf from "../assets/icon/employeeself.svg"
import ImageAiLogo from "../assets/icon/ai-newlogo.png"
import ImageTimeSheet from "../assets/icon/icon-timesheet.svg"


export class Resource {
    //Thông báo xóa thành công
    static deleteSuccess = "Xóa thành công."

    //Lỗi server
    static errorServer = "Có lỗi xảy ra, Vui lòng thử lại."

    //Thông báo cập nhật thành công
    static updateSuccess = "Cập nhật người dùng thành công."

    //Thông báo lỗi trống với field required
    static emptyFieldRequire = "Không được để trống."

    //Thông báo lỗi nếu không chọn role
    static notChoseRole = "Chọn ít nhất 1."
    
    //Thông báo lỗi mã nhân viên đã tồn tại
    static employeeCodeExist = "Mã nhân viên đã tồn tại."

    //Thông báo lỗi email không đúng định dạng
    static emailInvalid = "Email không đúng định dạng."

    //Thông báo lỗi dữ liệu form
    static errorForm = "Dữ liệu người dùng không không hợp lệ. Vui lòng kiểm tra lại."

    // Mảng  item header
    static headerNavigates = [
        {
            text:'Lượt chạy',
            path:'/process/execute'
        },
        {
            text:'Thiết kế quy trình',
            path:'/process/definition'
        },
        {
            text:'Báo cáo',
            path:'/process/report'
        },
        {
            text:'Thiết lập',
            path:'/process/setting'
        }
    ]

    // Mảng  item sidebar của setting page
    static sidebarSettingNavigates = [
        {
            text:'Người dùng',
            path:'/process/setting/user',
            classIcon:'msp-icon-employee'
        },
        {
            text:'Vai trò',
            path:'/process/setting/permission',
            classIcon:'msp-icon-protect'
        },
        {
            text:'Nhóm người dùng',
            path:'/process/setting/user-group',
            classIcon:'msp-icon-multi-user'
        },
        {
            text:'Kết nối',
            path:'/process/setting/connect',
            classIcon:'msp-icon-connect'
        }
    ]

    //Mảng chứa thông tin app
    static listApp = [
        {
            appName:'AMIS Quy trình',
            appImage:ImageProcess,
            isFavorite:false,
        },
        {
            appName:'Mạng xã hội',
            appImage:ImageNewFeed,
            isFavorite:false,
        },{
            appName:'Tiền lương',
            appImage:ImagePayroll,
            isFavorite:false,
        },{
            appName:'Hệ thống',
            appImage:ImageSystem,
            isFavorite:false,
        },{
            appName:'Thông tin nhân viên',
            appImage:ImageEmployee,
            isFavorite:false,
        },{
            appName:'Công việc',
            appImage:ImageTask,
            isFavorite:false,
        },{
            appName:'Tuyển dụng',
            appImage:ImageRecruit,
            isFavorite:false,
        },{
            appName:'WeSign',
            appImage:ImageWeSign,
            isFavorite:false,
        },{
            appName:'Nhân viên',
            appImage:ImageEmployeeSelf,
            isFavorite:false,
        },{
            appName:'aiMarketing 2.0',
            appImage:ImageAiLogo,
            isFavorite:false,
        },{
            appName:'Chấm công',
            appImage:ImageTimeSheet,
            isFavorite:false,
        },
    ]

    //Mảng 
    static listFieldUserRender = [
        {
            fieldName:'EmployeeCode',
            fieldDisplay:'Mã nhân viên',
            require:true,
            isRender:true,
            width:'174'
        },
        {
            fieldName:'FullName',
            fieldDisplay:'Họ và tên',
            require:true,
            isRender:true,
            width:'200',
        },{
            fieldName:'DepartmentName',
            fieldDisplay:'Phòng ban',
            require:false,
            isRender:true,
            width:'200'
        },{
            fieldName:'JobPositionName',
            fieldDisplay:'Vị trí công việc',
            require:false,
            isRender:true,
            width:'250'
        },
        {
            fieldName:'Email',
            fieldDisplay:'Email',
            require:false,
            isRender:true,
            width:'250'
        },{
            fieldName:'RoleNames',
            fieldDisplay:'Vai trò',
            require:false,
            isRender:true,
            width:'200'
        },{
            fieldName:'ActiveStatus',
            fieldDisplay:'Tình trạng',
            require:false,
            isRender:true,
            width:'200'
        },
    ]

    static confirmCloseForm = "Đã có phát sinh dữ liệu. Bạn có muốn lưu lại không?"

    static ActiveStatusList = [
        {
            ActiveStatus:0,
            ActiveStatusText:'Chưa kích hoạt'
        },
        {
            ActiveStatus:1,
            ActiveStatusText:'Chờ xác nhận'
        },
        {
            ActiveStatus:2,
            ActiveStatusText:'Đang họat động'
        },
        {
            ActiveStatus:3,
            ActiveStatusText:'Ngừng kích hoạt'
        }
    ]

    /**
     * Message thêm mới thành công
     * Author : mhungwebdev (1/9/2022)
     * @param {*} count 
     * @returns message thêm mới thành công
     */
    static insertSuccess(count){
        return `Thêm mới thành công ${count} người dùng.`
    }
}