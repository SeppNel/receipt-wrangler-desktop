import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { ReceiptsService } from 'src/api/receipts.service';
import { Receipt } from 'src/models/receipt';

@Component({
  selector: 'app-receipts-table',
  templateUrl: './receipts-table.component.html',
  styleUrls: ['./receipts-table.component.scss'],
})
export class ReceiptsTableComponent implements OnInit {
  constructor(private receiptsService: ReceiptsService) {}

  public receipts: Receipt[] = [];

  public displayedColumns = [
    'date',
    'name',
    'paidBy',
    'amount',
    'categories',
    'tags',
    'isResolved',
    'actions',
  ];

  public ngOnInit(): void {
    this.receiptsService
      .getAllReceipts()
      .pipe(tap((receipts) => (this.receipts = receipts)))
      .subscribe();
  }

  public toggleIsResolved(row: Receipt, index: number): void {
    this.receiptsService
      .toggleIsResolved(row.id.toString())
      .pipe(
        tap(() => {
          const newReceipts = Array.from(this.receipts);
          newReceipts.splice(index, 1, {
            ...row,
            isResolved: !row.isResolved,
          });
          this.receipts = newReceipts;
        })
      )
      .subscribe();
  }
}
