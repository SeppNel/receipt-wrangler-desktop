/**
 * Receipt Wrangler API.
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


/**
 * Tag to relate receipts to
 */
export interface UpsertTagCommand { 
    /**
     * Tag id
     */
    id?: number;
    /**
     * Tag name
     */
    name: string;
    /**
     * Tag description
     */
    description?: string;
}

