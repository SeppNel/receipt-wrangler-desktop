import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { NgxsModule, Store } from "@ngxs/store";
import { of } from "rxjs";
import { Dashboard, DashboardService } from "../../open-api";
import { PipesModule } from "../../pipes";
import { SnackbarService } from "../../services";
import { GroupState } from "../../store";
import { DashboardFormComponent } from "./dashboard-form.component";

describe("DashboardFormComponent", () => {
  let component: DashboardFormComponent;
  let fixture: ComponentFixture<DashboardFormComponent>;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardFormComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        NgxsModule.forRoot([GroupState]),
        PipesModule,
        ReactiveFormsModule,
      ],
      providers: [
        DashboardService,
        MatDialog,
        {
          provide: MatDialogRef<DashboardFormComponent>,
          useValue: {
            close: (...args: any) => {},
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(DashboardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should init form with no data correctly", () => {
    store.reset({
      groups: {
        selectedGroupId: "1",
      },
    });

    component.ngOnInit();

    expect(component.form.value).toEqual({
      name: "",
      groupId: "1",
      widgets: [],
    });
  });

  it("should submit valid form", () => {
    const dashboard: Dashboard = {
      id: 1,
      userId: 1,
      name: "test",
      groupId: 1,
      widgets: [],
    } as Dashboard;

    const serviceSpy = spyOn(
      TestBed.inject(DashboardService),
      "createDashboard"
    ).and.callFake(() => of(dashboard as any));
    const snackbarSpy = spyOn(SnackbarService.prototype, "success");

    store.reset({
      groups: {
        selectedGroupId: 1,
      },
    });

    component.ngOnInit();
    component.form.patchValue({
      name: "test",
    });

    component.submit();

    expect(serviceSpy).toHaveBeenCalledWith({
      name: "test",
      groupId: 1,
      widgets: [],
    } as any);
    expect(snackbarSpy).toHaveBeenCalledTimes(1);
  });
});
