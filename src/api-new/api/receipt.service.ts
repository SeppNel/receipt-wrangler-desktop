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
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { BulkStatusUpdateCommand } from '../model/bulkStatusUpdateCommand';
import { PagedRequestCommand } from '../model/pagedRequestCommand';
import { Receipt } from '../model/receipt';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class ReceiptService {

    protected basePath = '/api';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Bulk receipt status update
     * This will bulk update receipt statuses with the option of adding a comment to each [SYSTEM USER]
     * @param body Bulk status data
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public bulkReceiptStatusUpdate(body: BulkStatusUpdateCommand, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public bulkReceiptStatusUpdate(body: BulkStatusUpdateCommand, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public bulkReceiptStatusUpdate(body: BulkStatusUpdateCommand, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public bulkReceiptStatusUpdate(body: BulkStatusUpdateCommand, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling bulkReceiptStatusUpdate.');
        }

        let headers = this.defaultHeaders;

        // authentication (bearerAuth) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<any>('post',`${this.basePath}/receipt/bulkStatusUpdate`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create receipt
     * This will create a receipt [SYSTEM USER]
     * @param body Receipt to create
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createReceipt(body: Receipt, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public createReceipt(body: Receipt, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public createReceipt(body: Receipt, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public createReceipt(body: Receipt, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createReceipt.');
        }

        let headers = this.defaultHeaders;

        // authentication (bearerAuth) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<any>('post',`${this.basePath}/receipt/`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Delete receipt
     * This will delete a receipt by id [SYSTEM USER]
     * @param receiptId Id of receipt to get
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteReceiptById(receiptId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteReceiptById(receiptId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteReceiptById(receiptId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteReceiptById(receiptId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (receiptId === null || receiptId === undefined) {
            throw new Error('Required parameter receiptId was null or undefined when calling deleteReceiptById.');
        }

        let headers = this.defaultHeaders;

        // authentication (bearerAuth) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('delete',`${this.basePath}/receipt/${encodeURIComponent(String(receiptId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Duplicate receipt
     * This will duplicate a receipt [SYSTEM USER]
     * @param receiptId Id of receipt to duplicate
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public duplicateReceipt(receiptId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public duplicateReceipt(receiptId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public duplicateReceipt(receiptId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public duplicateReceipt(receiptId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (receiptId === null || receiptId === undefined) {
            throw new Error('Required parameter receiptId was null or undefined when calling duplicateReceipt.');
        }

        let headers = this.defaultHeaders;

        // authentication (bearerAuth) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('post',`${this.basePath}/receipt/${encodeURIComponent(String(receiptId))}/duplicate`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get receipt
     * This will get a receipt by receipt id [SYSTEM USER]
     * @param receiptId Id of receipt to get
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getReceiptById(receiptId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getReceiptById(receiptId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getReceiptById(receiptId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getReceiptById(receiptId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (receiptId === null || receiptId === undefined) {
            throw new Error('Required parameter receiptId was null or undefined when calling getReceiptById.');
        }

        let headers = this.defaultHeaders;

        // authentication (bearerAuth) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('get',`${this.basePath}/receipt/${encodeURIComponent(String(receiptId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Gets receipts
     * This will return receipts with the option to sort and filter [SYSTEM USER]
     * @param body 
     * @param groupId Get all receipts that belong to groupId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getReceiptsForGroup(body: PagedRequestCommand, groupId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getReceiptsForGroup(body: PagedRequestCommand, groupId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getReceiptsForGroup(body: PagedRequestCommand, groupId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getReceiptsForGroup(body: PagedRequestCommand, groupId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling getReceiptsForGroup.');
        }

        if (groupId === null || groupId === undefined) {
            throw new Error('Required parameter groupId was null or undefined when calling getReceiptsForGroup.');
        }

        let headers = this.defaultHeaders;

        // authentication (bearerAuth) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<any>('post',`${this.basePath}/receipt/group/${encodeURIComponent(String(groupId))}`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update receipt
     * This will update a receipt by receipt id [SYSTEM USER]
     * @param body Receipt to update
     * @param receiptId Id of receipt to get
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateReceipt(body: Receipt, receiptId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateReceipt(body: Receipt, receiptId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateReceipt(body: Receipt, receiptId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateReceipt(body: Receipt, receiptId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateReceipt.');
        }

        if (receiptId === null || receiptId === undefined) {
            throw new Error('Required parameter receiptId was null or undefined when calling updateReceipt.');
        }

        let headers = this.defaultHeaders;

        // authentication (bearerAuth) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<any>('put',`${this.basePath}/receipt/${encodeURIComponent(String(receiptId))}`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
