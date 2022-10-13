/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PeoplePublic } from '../models/PeoplePublic';
import type { SearchPublic } from '../models/SearchPublic';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SearchService {

    /**
     * Поиск абитуриентов
     * @param requestBody 
     * @returns PeoplePublic Successful Response
     * @throws ApiError
     */
    public static searchApiV1SearchPost(
requestBody: SearchPublic,
): CancelablePromise<Array<PeoplePublic>> {
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
