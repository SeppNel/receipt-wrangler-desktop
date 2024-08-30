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
import { WidgetType } from './widgetType';


/**
 * Widget related to a user\'s dashboard
 */
export interface Widget { 
    createdAt?: string;
    createdBy?: number;
    id: number;
    /**
     * Widget name
     */
    name?: string;
    /**
     * Dashboard foreign key
     */
    dashboardId: number;
    updatedAt?: string;
    /**
     * Type of widget
     */
    widgetType?: WidgetType;
    /**
     * Configuration of widget
     */
    configuration?: { [key: string]: any; };
}
export namespace Widget {
}


