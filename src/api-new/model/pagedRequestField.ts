/**
 * Receipt Wrangler API.
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

export interface PagedRequestField { 
    /**
     * Filter operation
     */
    operation: PagedRequestField.OperationEnum;
    /**
     * Field value
     */
    value: string;
}
export namespace PagedRequestField {
    export type OperationEnum = 'CONTAINS' | 'EQUALS' | 'GREATER_THAN' | 'LESS_THAN';
    export const OperationEnum = {
        CONTAINS: 'CONTAINS' as OperationEnum,
        EQUALS: 'EQUALS' as OperationEnum,
        GREATERTHAN: 'GREATER_THAN' as OperationEnum,
        LESSTHAN: 'LESS_THAN' as OperationEnum
    };
}