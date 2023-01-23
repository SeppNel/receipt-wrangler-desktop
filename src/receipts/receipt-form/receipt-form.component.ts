import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Select, Selector, Store } from '@ngxs/store';

import {
  filter,
  finalize,
  forkJoin,
  iif,
  Observable,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { ReceiptImagesService } from 'src/api/receipt-images.service';
import { ReceiptsService } from 'src/api/receipts.service';
import { FormMode } from 'src/enums/form-mode.enum';
import { Category, Receipt, Tag } from 'src/models';
import { FileData } from 'src/models/file-data';
import { Group } from 'src/models/group';
import { SnackbarService } from 'src/services/snackbar.service';
import { GroupState } from 'src/store/group.state';
import { ItemListComponent } from '../item-list/item-list.component';
import { QuickActionsDialogComponent } from '../quick-actions-dialog/quick-actions-dialog.component';
import { formatImageData } from '../utils/form.utils';

@Component({
  selector: 'app-receipt-form',
  templateUrl: './receipt-form.component.html',
  styleUrls: ['./receipt-form.component.scss'],
})
export class ReceiptFormComponent implements OnInit {
  @ViewChild(ItemListComponent) itemsListComponent!: ItemListComponent;

  @Select(GroupState.groups) public groups!: Observable<Group[]>;

  public categories: Category[] = [];

  public tags: Tag[] = [];

  public originalReceipt?: Receipt;

  public images: FileData[] = [];

  public mode: FormMode = FormMode.view;

  public formMode = FormMode;

  public editLink = '';

  public imagesLoading: boolean = false;

  constructor(
    private receiptsService: ReceiptsService,
    private receiptImagesService: ReceiptImagesService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private snackbarService: SnackbarService,
    private matDialog: MatDialog,
    private store: Store
  ) {}

  public form: FormGroup = new FormGroup({});

  public ngOnInit(): void {
    this.categories = this.activatedRoute.snapshot.data['categories'];
    this.tags = this.activatedRoute.snapshot.data['tags'];
    this.originalReceipt = this.activatedRoute.snapshot.data['receipt'];
    this.editLink = `/receipts/${this.originalReceipt?.id}/edit`;
    this.initForm();
    this.getImageFiles();
    this.mode = this.activatedRoute.snapshot.data['mode'];
  }

  private initForm(): void {
    const selectedGroupId = this.store.selectSnapshot(
      GroupState.selectedGroupId
    );
    this.form = this.formBuilder.group({
      name: [this.originalReceipt?.name ?? '', Validators.required],
      amount: [
        this.originalReceipt?.amount ?? '',
        [Validators.required, Validators.min(1)],
      ],
      categories: this.formBuilder.array(
        this.originalReceipt?.categories ?? []
      ),
      tags: this.formBuilder.array(this.originalReceipt?.tags ?? []),
      date: [this.originalReceipt?.date ?? new Date(), Validators.required],
      paidByUserId: [
        this.originalReceipt?.paidByUserId ?? '',
        Validators.required,
      ],
      groupId: [
        this.originalReceipt?.groupId ?? selectedGroupId,
        Validators.required,
      ],
      isResolved: this.originalReceipt?.isResolved ?? false,
    });
  }

  private getImageFiles(): void {
    if (
      this.originalReceipt?.imageFiles &&
      this.originalReceipt?.imageFiles?.length > 0
    ) {
      this.imagesLoading = true;
      this.originalReceipt?.imageFiles.forEach((file) => {
        this.receiptImagesService
          .getImageFiles(file.id.toString())
          .pipe(
            tap((data) => {
              file.imageData = data;
              this.images.push(file);
            }),
            finalize(() => (this.imagesLoading = false))
          )
          .subscribe();
      });
    }
  }

  public openQuickActionsModal(): void {
    const dialogRef = this.matDialog.open(QuickActionsDialogComponent);

    dialogRef.componentInstance.parentForm = this.form;
    dialogRef.componentInstance.originalReceipt = this.originalReceipt;

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result: boolean) => {
        if (result) {
          this.itemsListComponent.setUserItemMap();
        }
      });
  }

  public removeImage(index: number): void {
    const image = this.images[index];
    this.receiptImagesService
      .deleteImage(image.id.toString())
      .pipe(
        tap(() => {
          this.images.splice(index, 1);
        })
      )
      .subscribe();
  }

  public groupDisplayWith(id: number): string {
    const group = this.store.selectSnapshot(
      GroupState.getGroupById(id?.toString())
    );

    if (group) {
      return group.name;
    }
    return '';
  }

  public submit(): void {
    if (this.originalReceipt && this.form.valid) {
      this.receiptsService
        .updateReceipt(this.originalReceipt.id.toString(), this.form.value)
        .pipe(
          tap(() => {
            this.snackbarService.success('Successfully updated receipt');
          })
        )
        .subscribe();
    } else if (this.mode === FormMode.add && this.form.valid) {
      this.receiptsService
        .createReceipt(this.form.value)
        .pipe(
          tap(() => {
            this.snackbarService.success('Successfully added receipt');
          }),
          switchMap((r) =>
            iif(
              () => this.images.length > 0,
              forkJoin(
                this.images.map((image) =>
                  this.receiptImagesService.uploadImage(
                    formatImageData(image, r.id)
                  )
                )
              ),
              of('')
            )
          )
        )
        .subscribe();
    }
  }
}
