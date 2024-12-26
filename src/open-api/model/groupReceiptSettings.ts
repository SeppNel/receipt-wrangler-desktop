/**
 * Receipt Wrangler API.
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface GroupReceiptSettings { 
    id: number;
    createdAt: string;
    createdBy?: number;
    /**
     * Created by entity\'s name
     */
    createdByString?: string;
    updatedAt?: string;
    /**
     * Group foreign key
     */
    groupId: number;
    /**
     * Hide receipt images
     */
    hideImages?: boolean;
    /**
     * Hide receipt categories
     */
    hideReceiptCategories?: boolean;
    /**
     * Hide receipt tags
     */
    hideReceiptTags?: boolean;
    /**
     * Hide receipt item categories
     */
    hideItemCategories?: boolean;
    /**
     * Hide receipt item tags
     */
    hideItemTags?: boolean;
    /**
     * Hide receipt comments
     */
    hideComments?: boolean;
}

