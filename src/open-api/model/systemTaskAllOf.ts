/**
 * Receipt Wrangler API.
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { SystemTaskStatus } from './systemTaskStatus';
import { SystemTaskType } from './systemTaskType';
import { AssociatedEntityType } from './associatedEntityType';


export interface SystemTaskAllOf { 
    type?: SystemTaskType;
    status?: SystemTaskStatus;
    startedAt?: string;
    endedAt?: string;
    associatedEntityId?: number;
    associatedEntityType?: AssociatedEntityType;
    resultDescription?: string;
}

