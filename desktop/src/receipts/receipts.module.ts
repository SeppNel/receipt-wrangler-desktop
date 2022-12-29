import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceiptsTableComponent } from './receipts-table/receipts-table.component';
import { ReceiptsRoutingModule } from './receipts-routing.module';
import { MatTableModule } from '@angular/material/table';
import { PipesModule } from 'src/pipes/pipes.module';

@NgModule({
  declarations: [ReceiptsTableComponent],
  imports: [CommonModule, ReceiptsRoutingModule, MatTableModule, PipesModule],
})
export class ReceiptsModule {}
