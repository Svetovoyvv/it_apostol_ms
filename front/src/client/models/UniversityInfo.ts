/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StudyDirectionPublic } from './StudyDirectionPublic';

export type UniversityInfo = {
    display_name: string;
    description: string;
    link: string;
    id: number;
    study_directions: Array<StudyDirectionPublic>;
};
