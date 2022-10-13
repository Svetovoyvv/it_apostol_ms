/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StudyDirectionPublic } from './StudyDirectionPublic';
import type { UniversityPublic } from './UniversityPublic';

export type PeoplePublic = {
    ins_number: string;
    university: UniversityPublic;
    study: StudyDirectionPublic;
    link: string;
    change: number;
    agreed: boolean;
};
