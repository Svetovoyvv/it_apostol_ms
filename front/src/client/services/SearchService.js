import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SearchService {
    /**
     * Поиск абитуриентов
     * @param requestBody
     * @returns PeoplePublic Successful Response
     * @throws ApiError
     */
    static searchApiV1SearchPost(requestBody) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/search/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
