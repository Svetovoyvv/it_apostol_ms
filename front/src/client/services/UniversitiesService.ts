/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UniversityInfo } from '../models/UniversityInfo';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UniversitiesService {

    /**
     * Get All Universities
     * @returns UniversityInfo Successful Response
     * @throws ApiError
     */
    public static getAllUniversitiesApiV1UniversitiesGet(): CancelablePromise<Array<UniversityInfo>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/universities/',
        });
    }

}
