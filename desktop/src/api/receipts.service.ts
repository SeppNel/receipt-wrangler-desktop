import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Receipt } from 'src/models/receipt';

@Injectable({
  providedIn: 'root',
})
export class ReceiptsService {
  constructor(private httpClient: HttpClient) {}

  public getAllReceipts(): Observable<Receipt[]> {
    return this.httpClient.get<Receipt[]>('/api/receipt').pipe(take(1));
  }
}
