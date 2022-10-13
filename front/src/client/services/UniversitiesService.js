import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UniversitiesService {
    /**
     * Get All Universities
     * @returns UniversityInfo Successful Response
     * @throws ApiError
     */
    static getAllUniversitiesApiV1UniversitiesGet() {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/universities/',
        });
    }
}
