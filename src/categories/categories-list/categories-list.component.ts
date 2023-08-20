import { switchMap, take, tap } from 'rxjs';
import { CategoryTableState } from 'src/store/category-table.state';
import {
  SetOrderBy,
  SetPage,
  SetPageSize,
  SetSortDirection,
} from 'src/store/paged-table.state.actions';
import { TableColumn } from 'src/table/table-column.interface';
import { TableComponent } from 'src/table/table/table.component';

import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngxs/store';
import {
  Category,
  CategoryService,
  CategoryView,
  PagedRequestCommand,
  SnackbarService,
} from '@receipt-wrangler/receipt-wrangler-core';
import { Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CategoryForm } from '../edit-category-dialog/category-form.component';
import { DEFAULT_DIALOG_CONFIG } from 'src/constants';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
})
export class CategoriesListComponent implements OnInit, AfterViewInit {
  @ViewChild('nameCell') public nameCell!: TemplateRef<any>;

  @ViewChild('numberOfReceiptsCell')
  public numberOfReceiptsCell!: TemplateRef<any>;

  @ViewChild('actionsCell')
  public actionsCell!: TemplateRef<any>;

  @ViewChild(TableComponent) public table!: TableComponent;

  constructor(
    private store: Store,
    private categoryService: CategoryService,
    private matDialog: MatDialog,
    private snackbarService: SnackbarService
  ) {}

  public dataSource: MatTableDataSource<CategoryView> =
    new MatTableDataSource<CategoryView>([]);

  public displayedColumns: string[] = [];

  public columns: TableColumn[] = [];

  public totalCount: number = 0;

  public headerText: string = 'Categories';

  public ngOnInit(): void {
    this.initTableData();
  }

  public ngAfterViewInit(): void {
    this.initTable();
  }

  private initTableData(): void {
    this.getCategories();
  }

  private getCategories(): void {
    const command: PagedRequestCommand = this.store.selectSnapshot(
      CategoryTableState.state
    );

    this.categoryService
      .getPagedCategories(command)
      .pipe(
        take(1),
        tap((pagedData) => {
          this.dataSource = new MatTableDataSource<CategoryView>(
            pagedData.data
          );
          this.totalCount = pagedData.totalCount;
        })
      )
      .subscribe();
  }

  public updatePageData(pageEvent: PageEvent) {
    const newPage = pageEvent.pageIndex + 1;

    this.store.dispatch(new SetPage(newPage));
    this.store.dispatch(new SetPageSize(pageEvent.pageSize));

    this.getCategories();
  }

  public sorted(sortState: Sort): void {
    this.store.dispatch(new SetOrderBy(sortState.active));
    this.store.dispatch(new SetSortDirection(sortState.direction));

    this.getCategories();
  }

  private initTable(): void {
    this.setColumns();
  }

  private setColumns(): void {
    this.columns = [
      {
        columnHeader: 'Name',
        matColumnDef: 'name',
        template: this.nameCell,
        sortable: true,
      },
      {
        columnHeader: 'Number of Receipts with Category',
        matColumnDef: 'numberOfReceipts',
        template: this.numberOfReceiptsCell,
        sortable: true,
      },
      {
        columnHeader: 'Number of Receipts with Category',
        matColumnDef: 'actions',
        template: this.actionsCell,
        sortable: false,
      },
    ];

    this.displayedColumns = ['name', 'numberOfReceipts', 'actions'];
  }

  public openEditDialog(categoryView: CategoryView): void {
    const dialogRef = this.matDialog.open(CategoryForm, DEFAULT_DIALOG_CONFIG);

    dialogRef.componentInstance.category = categoryView;
    dialogRef.componentInstance.headerText = `Edit ${categoryView.name}`;

    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        tap((refreshData) => {
          if (refreshData) {
            this.getCategories();
          }
        })
      )
      .subscribe();
  }
}
