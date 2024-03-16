import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { NgxsModule, Store } from "@ngxs/store";
import { of } from "rxjs";
import { ApiModule, UserService } from "../../open-api";
import { PipesModule } from "../../pipes";
import { SnackbarService } from "../../services";
import { UpdateUser, UserState } from "../../store";
import { DummyUserConversionDialogComponent } from "./dummy-user-conversion-dialog.component";

describe("DummyUserConversionDialogComponent", () => {
  let component: DummyUserConversionDialogComponent;
  let fixture: ComponentFixture<DummyUserConversionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DummyUserConversionDialogComponent],
      imports: [
        ApiModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        NgxsModule.forRoot([UserState]),
        PipesModule,
      ],
      providers: [
        SnackbarService,
        {
          provide: MatDialogRef,
          useValue: {
            close: () => {},
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(DummyUserConversionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should init form correctly", () => {
    component.ngOnInit();

    expect(component.form.value).toEqual({
      password: "",
    });
  });

  it("should call close when cancel button is clicked", () => {
    const dialogRefSpy = spyOn(component.matDialogRef, "close");
    component.cancelButtonClicked();

    expect(dialogRefSpy).toHaveBeenCalledTimes(1);
  });

  it("should call service and call update in state", () => {
    const usersService = TestBed.inject(UserService);

    const usersSpy = spyOn(usersService, "convertDummyUserById");
    usersSpy.and.returnValue(of(undefined as any));

    const store = TestBed.inject(Store);
    const storeSpy = spyOn(store, "dispatch");
    storeSpy.and.returnValue(of(undefined));

    const dialogSpy = spyOn(component.matDialogRef, "close");
    dialogSpy.and.returnValue(undefined);

    spyOn(TestBed.inject(SnackbarService), "success").and.returnValue(
      undefined
    );

    component.user = {
      id: 1,
    } as any;

    component.ngOnInit();

    component.form.patchValue({
      password: "hello world",
    });

    component.submitButtonClicked();

    expect(usersSpy).toHaveBeenCalledWith(
      {
        password: "hello world",
      },
      1
    );
    expect(storeSpy).toHaveBeenCalledWith(
      new UpdateUser("1", { id: 1, isDummyUser: false } as any)
    );
    expect(dialogSpy).toHaveBeenCalledOnceWith(true);
  });
});
