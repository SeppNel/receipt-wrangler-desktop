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
import { Prompt } from './prompt';


export interface ReceiptProcessingSettings { 
    id: number;
    createdAt: string;
    createdBy?: number;
    /**
     * Created by entity\'s name
     */
    createdByString?: string;
    updatedAt?: string;
    /**
     * Name of the settings
     */
    name?: string;
    /**
     * Description of the settings
     */
    description?: string;
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
     * Is vision model
     */
    isVisionModel?: boolean;
    ocrEngine?: OcrEngine;
    prompt?: Prompt;
    /**
     * Prompt foreign key
     */
    promptId?: number;
}
export namespace ReceiptProcessingSettings {
}


