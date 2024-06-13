/**
 * Receipt Wrangler API.
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 5.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { SortDirection } from './sortDirection';
import { GroupFilter } from './groupFilter';


export interface PagedGroupRequestCommand { 
    /**
     * Page number
     */
    page: number;
    /**
     * Number of records per page
     */
    pageSize: number;
    /**
     * field to order on
     */
    orderBy?: string;
    sortDirection?: SortDirection;
    filter?: GroupFilter;
}

