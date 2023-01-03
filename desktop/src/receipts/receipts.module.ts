import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceiptsTableComponent } from './receipts-table/receipts-table.component';
import { ReceiptsRoutingModule } from './receipts-routing.module';
import { MatTableModule } from '@angular/material/table';
import { PipesModule } from 'src/pipes/pipes.module';
import { SlideToggleModule } from 'src/slide-toggle/slide-toggle.module';
import { ButtonModule } from 'src/button/button.module';
import { ReceiptFormComponent } from './receipt-form/receipt-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputModule } from 'src/input/input.module';
import { AutocompleteModule } from 'src/autocomplete/autocomplete.module';
import { DatepickerComponent } from 'src/datepicker/datepicker/datepicker.component';
import { DatepickerModule } from 'src/datepicker/datepicker.module';

@NgModule({
  declarations: [ReceiptsTableComponent, ReceiptFormComponent],
  imports: [
    CommonModule,
    ReceiptsRoutingModule,
    MatTableModule,
    PipesModule,
    SlideToggleModule,
    ButtonModule,
    ReactiveFormsModule,
    InputModule,
    AutocompleteModule,
    DatepickerModule,
  ],
})
export class ReceiptsModule {}
