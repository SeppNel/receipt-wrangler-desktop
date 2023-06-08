import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { switchMap, take, tap } from 'rxjs';
import { UsersService } from 'src/api/users.service';
import { User } from 'src/models';
import { SnackbarService } from 'src/services/snackbar.service';
import { UpdateUser } from 'src/store/user.state.actions';

@Component({
  selector: 'app-dummy-user-conversion-dialog',
  templateUrl: './dummy-user-conversion-dialog.component.html',
  styleUrls: ['./dummy-user-conversion-dialog.component.scss'],
})
export class DummyUserConversionDialogComponent implements OnInit {
  @Input() public user!: User;

  public form: FormGroup = new FormGroup({});

  constructor(
    public matDialogRef: MatDialogRef<DummyUserConversionDialogComponent>,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private snackbarService: SnackbarService,
    private store: Store
  ) {}

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      password: ['', Validators.required],
    });
  }

  public submitButtonClicked(): void {
    if (this.form.valid) {
      let userId: string = this.user?.id?.toString();
      this.usersService
        .convertDummyUserToNormalUser(userId, this.form.value)
        .pipe(
          take(1),
          tap(() => {
            this.snackbarService.success(
              `${this.user.displayName} sucessfully converted to normal user`
            );
          }),
          switchMap(() =>
            this.store.dispatch(
              new UpdateUser(userId, { ...this.user, isDummyUser: false })
            )
          ),
          tap(() => this.matDialogRef.close(true))
        )
        .subscribe();
    }
  }

  public cancelButtonClicked(): void {
    this.matDialogRef.close(false);
  }
}
