import { DEFAULT_INTERPOLATION_CONFIG } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import {
  DEFAULT_SNACKBAR_CONFIG,
  DEFAULT_SNACKBAR_ACTION,
} from 'constants/index';

import { Observable, tap } from 'rxjs';
import { ReceiptsService } from 'src/api/receipts.service';
import { Category, Receipt, Tag } from 'src/models';
import { User } from 'src/models/user';
import { UserState } from 'src/store/user.state';

@Component({
  selector: 'app-receipt-form',
  templateUrl: './receipt-form.component.html',
  styleUrls: ['./receipt-form.component.scss'],
})
export class ReceiptFormComponent implements OnInit {
  @Select(UserState.users) public users!: Observable<User[]>;

  public categories: Category[] = [];

  public tags: Tag[] = [];

  public originalReceipt?: Receipt;

  constructor(
    private receiptsService: ReceiptsService,
    private formBuilder: FormBuilder,
    private store: Store,
    private acitvatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar
  ) {}

  public form: FormGroup = new FormGroup({});

  public ngOnInit(): void {
    this.categories = this.acitvatedRoute.snapshot.data['categories'];
    this.tags = this.acitvatedRoute.snapshot.data['tags'];

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
      categories: this.formBuilder.array([]),
      tags: this.formBuilder.array([]),
      date: [new Date(), Validators.required],
      paidByUserId: [null, Validators.required],
      isResolved: false,
    });
  }

  public paidByDisplayWith(id: number): string {
    const user = this.store.selectSnapshot(
      UserState.getUserById(id.toString())
    );

    if (user) {
      return user.displayName;
    }
    return '';
  }

  public submit(): void {
    if (this.originalReceipt && this.form.valid) {
    } else if (!this.originalReceipt && this.form.valid) {
      this.receiptsService
        .createReceipt(this.form.value)
        .pipe(
          tap(() => {
            this.snackbar.open(
              'Successfully added receipt',
              DEFAULT_SNACKBAR_ACTION,
              DEFAULT_SNACKBAR_CONFIG
            );
          })
        )
        .subscribe();
    }
  }
}
