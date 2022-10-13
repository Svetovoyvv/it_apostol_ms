import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserService {
    /**
     * Авторизация пользователя
     * @param formData
     * @returns LoginResponse Login successful
     * @throws ApiError
     */
    static loginApiV1UserLoginPost(formData) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/user/login',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                401: `Invalid email or password`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Получить информацию о пользователе
     * @returns UserPublic Successful Response
     * @throws ApiError
     */
    static profileApiV1UserProfileGet() {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/user/profile',
        });
    }
    /**
     * Регистрация пользователя
     * @param requestBody
     * @returns UserPublic Successful Response
     * @throws ApiError
     */
    static registerApiV1UserRegisterPost(requestBody) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/user/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
