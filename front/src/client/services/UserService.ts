/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_login_api_v1_user_login_post } from '../models/Body_login_api_v1_user_login_post';
import type { LoginResponse } from '../models/LoginResponse';
import type { UserPublic } from '../models/UserPublic';
import type { UserRegister } from '../models/UserRegister';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * Авторизация пользователя
     * @param formData 
     * @returns LoginResponse Login successful
     * @throws ApiError
     */
    public static loginApiV1UserLoginPost(
formData: Body_login_api_v1_user_login_post,
): CancelablePromise<LoginResponse> {
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
    public static profileApiV1UserProfileGet(): CancelablePromise<UserPublic> {
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
    public static registerApiV1UserRegisterPost(
requestBody: UserRegister,
): CancelablePromise<UserPublic> {
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
