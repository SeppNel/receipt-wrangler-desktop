/**
 * Receipt Wrangler API.
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { OcrEngine } from './ocrEngine';
import { AiType } from './aiType';


export interface CheckReceiptProcessingSettingsConnectivityCommand { 
    /**
     * Receipt processing settings id
     */
    id?: number;
    /**
     * Name of the settings
     */
    name?: string;
    aiType?: AiType;
    /**
     * URL for custom endpoints
     */
    url?: string;
    /**
     * Key for endpoints that require authentication
     */
    key?: string;
    /**
     * LLM model
     */
    model?: string;
    /**
     * Number of workers to use
     */
    numWorkers?: number;
    ocrEngine?: OcrEngine;
    /**
     * Prompt foreign key
     */
    promptId?: number;
}
export namespace CheckReceiptProcessingSettingsConnectivityCommand {
}


