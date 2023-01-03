import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CategoriesService } from 'src/api/categories.service';
import { Category } from 'src/models';

@Injectable({
  providedIn: 'root',
})
export class CategoriesResolverService implements Resolve<Category[]> {
  constructor(private categoriesService: CategoriesService) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Category[] | Observable<Category[]> | Promise<Category[]> {
    return this.categoriesService.getAllTags();
  }
}
