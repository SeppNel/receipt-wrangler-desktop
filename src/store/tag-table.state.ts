import { PagedTableInterface } from 'src/interfaces/paged-table.interface';
import { PagedTableState } from './paged-table.state';
import { Selector, State } from '@ngxs/store';
import { Inject, Injectable } from '@angular/core';

@State<PagedTableInterface>({
  name: 'tagTable',
  defaults: {
    page: 1,
    pageSize: 50,
    orderBy: 'name',
    sortDirection: 'desc',
  },
})
@Injectable()
export class TagTableState extends PagedTableState {}
