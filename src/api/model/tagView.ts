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


/**
 * Tag to relate receipts to
 */
export interface TagView { 
    createdAt?: string;
    createdBy?: number;
    id: number;
    /**
     * Name of the tag
     */
    name: string;
    /**
     * Description of the tag
     */
    description?: string;
    updatedAt?: string;
    /**
     * Number of receipts associated with this tag
     */
    numberOfReceipts: number;
}

