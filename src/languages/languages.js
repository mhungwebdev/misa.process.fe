import { createI18n } from "vue-i18n";

export const languages = createI18n({
    locale: 'vn',
    fallbackLocale: 'en',
    formatFallbackMessages: true,
    messages: {
        vn: {
            message: {
                confirmDelete: 'Bạn có chắc chắn muốn xóa <b>{fullName}</b> khỏi ứng dụng AMIS Quy trình không?',
                //Thông báo xóa thành công
                deleteSuccess: "Xóa thành công.",
                //Lỗi server
                errorServer: "Có lỗi xảy ra, Vui lòng thử lại.",
                //Thông báo cập nhật thành công
                updateSuccess: "Cập nhật người dùng thành công.",
                //Thông báo lỗi trống với field required
                emptyFieldRequire: "Không được để trống.",
                //Thông báo lỗi nếu không chọn role
                notChoseRole: "Chọn ít nhất 1.",
                //Thông báo lỗi mã nhân viên đã tồn tại
                employeeCodeExist: "Mã nhân viên đã tồn tại.",
                //Thông báo lỗi email không đúng định dạng
                emailInvalid: "Email không đúng định dạng.",
                //Thông báo lỗi dữ liệu form
                errorForm: "Dữ liệu người dùng không không hợp lệ. Vui lòng kiểm tra lại.",
                textCancelButton:"Hủy",
                textSaveForm:"Lưu"
            }
        },
        en: {
            message: {
                confirmDelete: 'Are you sure you want to delete <b>{fullName}</b> from AMISA Quy trình?',
                //Thông báo xóa thành công
                deleteSuccess: "Delete success.",
                //Lỗi server
                errorServer: "Error, please try again.",
                //Thông báo cập nhật thành công
                updateSuccess: "Update users successfully.",
                //Thông báo lỗi trống với field required
                emptyFieldRequire: "Do not leave empty.",
                //Thông báo lỗi nếu không chọn role
                notChoseRole: "Select at least 1.",
                //Thông báo lỗi mã nhân viên đã tồn tại
                employeeCodeExist: "Employee code exists.",
                //Thông báo lỗi email không đúng định dạng
                emailInvalid: "Email invalidate.",
                //Thông báo lỗi dữ liệu form
                errorForm: "User data is invalid. Please check again.",
                textCancelButton:"Cancel",
                textSaveForm:"Save",
            }
        }
    },
});