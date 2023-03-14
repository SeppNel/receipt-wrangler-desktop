import { Component } from '@angular/core';
import { take, tap } from 'rxjs';
import { UsersService } from 'src/api/users.service';

@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.scss'],
})
export class SummaryCardComponent {
  constructor(private usersService: UsersService) {}

  public usersOweMap: Map<string, string> = new Map();
  public userOwesMap: Map<string, string> = new Map();

  public ngOnInit(): void {
    this.usersService
      .geAmountOwedForUser()
      .pipe(
        take(1),
        tap((result) => {
          Object.keys(result).forEach((k) => {
            const key = k.toString();
            if (Number(result[k]) > 0) {
              this.userOwesMap.set(key, result[k].toString());
            } else {
              this.usersOweMap.set(key, result[k].toString());
            }
          });
        })
      )
      .subscribe();
  }
}
