/**
 * Receipt Wrangler API.
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


/**
 * User comment left on receipts
 */
export interface Comment { 
    /**
     * Additional information about the comment
     */
    additionalInfo?: string;
    /**
     * Comment itself
     */
    comment: string;
    /**
     * Comment foreign key used for repleis
     */
    commentId?: number;
    createdAt?: string;
    createdBy?: number;
    id: number;
    /**
     * Receipt foreign key
     */
    receiptId: number;
    updatedAt?: string;
    /**
     * User foreign key
     */
    userId: number;
}

