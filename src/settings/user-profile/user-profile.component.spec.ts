import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule, Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PipesModule } from 'src/pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthState } from 'src/store/auth.state';
import { UsersService } from 'src/api/users.service';
import { of } from 'rxjs';
import { AuthService } from 'src/api/auth.service';
import { UserState } from 'src/store/user.state';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      imports: [
        HttpClientModule,
        MatSnackBarModule,
        NgxsModule.forRoot([AuthState, UserState]),
        PipesModule,
        ReactiveFormsModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { data: { formConfig: {} } } },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init form correctly', () => {
    const store = TestBed.inject(Store);
    store.reset({
      auth: {
        username: 'cheetos',
        displayname: 'burger',
        defaultAvatarColor: '#CD5C5C',
      },
    });

    component.ngOnInit();

    expect(component.form.value).toEqual({
      username: 'cheetos',
      displayName: 'burger',
      defaultAvatarColor: '#CD5C5C',
    });
  });

  it('should submit form and update state correctly', () => {
    const store = TestBed.inject(Store);
    const serviceSpy = spyOn(TestBed.inject(UsersService), 'updateUserProfile');
    const authSpy = spyOn(TestBed.inject(AuthService), 'getNewRefreshToken');

    spyOn(
      TestBed.inject(UsersService),
      'getClaimsForLoggedInUser'
    ).and.returnValue(
      of({
        userId: '1',
        displayname: 'store',
        username: 'general',
      })
    );

    serviceSpy.and.returnValue(of(undefined));
    authSpy.and.returnValue(of(undefined));

    store.reset({
      users: { users: [{ id: 1, displayName: 'cheetos', username: 'burger' }] },
      auth: {
        userId: '1',
        username: 'cheetos',
        displayname: 'burger',
        defaultAvatarColor: '#CD5C5C',
      },
    });

    component.ngOnInit();
    component.form.patchValue({
      username: 'general',
      displayName: 'store',
    });

    component.submit();

    const updatedUser = store.selectSnapshot(AuthState.loggedInUser);
    const updatedUsers = store.selectSnapshot(UserState.users);

    expect(serviceSpy).toHaveBeenCalledWith({
      username: 'general',
      displayName: 'store',
      defaultAvatarColor: '#CD5C5C',
    } as any);
    expect(authSpy).toHaveBeenCalled();

    // expect(updatedUser).toEqual({
    //   id: 1,
    //   username: 'general',
    //   displayName: 'store',
    // } as any);

    // expect(updatedUsers[0]).toEqual({
    //   id: 1,
    //   username: 'general',
    //   displayName: 'store',
    // } as any);
  });
});
