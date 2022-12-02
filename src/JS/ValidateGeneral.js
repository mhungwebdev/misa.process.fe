import { languages } from "../languages/languages";
import { Resource } from "../Resource/Resource";
import { CommonJS } from "./CommonJS";

/**
 * Sử dụng để validate các trường hợp chung
 * Author : mhungwebdev (11/9/2022)
 */
export class ValidateGeneral {
    /**
     * Kiểm tra field không được phép null
     * Author : mhungwebdev (11/9/2022)
     * @param {*} entity đối tượng cần validate
     * @param {*} fieldName tên property
     * @param {*} isValid hợp lệ hay không hợp lệ
     * @returns true nếu hợp lệ - false nếu ngược lại
     */
    static validateFieldNotNull(entity,fieldName, isValid) {
        if (entity[fieldName] == null) {
            entity.ERROR[fieldName] = languages.global.t('message.emptyFieldRequire');
            isValid = false;
        }
        return isValid;
    }

    /**
     * Kiểm tra field là array và phải chọn ít nhất 1
     * Author : mhungwebdev (11/9/2022)
     * @param {*} entity đối tượng cần validate
     * @param {*} fieldName tên property
     * @param {*} isValid hợp lệ hay không hợp lệ
     * @returns true nếu hợp lệ - false nếu ngược lại
     */
    static validateArrayRequired(entity,fieldName, isValid) {
        if (entity[fieldName].length == 0) {
            entity.ERROR[fieldName] = languages.global.t('message.notChoseRole');
            isValid = false;
        }
        return isValid;
    }

    /**
     * Kiểm tra email đúng định dạng không
     * Author : mhungwebdev (11/9/2022)
     * @param {*} entity đối tượng cần validate
     * @param {*} fieldName tên property
     * @param {*} isValid hợp lệ hay không hợp lệ
     * @returns true nếu hợp lệ - false nếu ngược lại
     */
    static validateEmail(entity,fieldName, isValid) {
        if (entity[fieldName] && !CommonJS.ValidateEmail(entity[fieldName])) {
            entity.ERROR[fieldName] = languages.global.t('message.emailInvalid');
            isValid = false;
        }

        return isValid;
    }

    /**
     * Kiểm tra field required
     * Author : mhungwebdev (11/9/2022)
     * @param {*} entity Đối tượng cần validate
     * @param {*} fieldName tên property
     * @param {*} isValid hợp lệ hay không hợp lệ
     * @returns true nếu hợp lệ - false nếu ngược lại
     */
    static validateRequired(entity,fieldName, isValid) {
        if (entity[fieldName] == "" || entity[fieldName] == null) {
            entity.ERROR[fieldName] = languages.global.t('message.emptyFieldRequire')
            isValid = false;
        }

        return isValid;
    }
}