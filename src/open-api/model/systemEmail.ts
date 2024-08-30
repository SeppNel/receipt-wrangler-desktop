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


export interface SystemEmail { 
    id: number;
    createdAt: string;
    createdBy?: number;
    /**
     * Created by entity\'s name
     */
    createdByString?: string;
    updatedAt?: string;
    /**
     * IMAP host
     */
    host?: string;
    /**
     * IMAP port
     */
    port?: string;
    /**
     * IMAP username
     */
    username?: string;
    /**
     * IMAP password
     */
    password?: string;
}

