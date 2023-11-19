import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PipesModule } from 'src/pipes/pipes.module';
import { SharedUiModule } from 'src/shared-ui/shared-ui.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardFormComponent } from './dashboard-form/dashboard-form.component';

@NgModule({
  declarations: [DashboardComponent, DashboardFormComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatCardModule,
    PipesModule,
    SharedUiModule,
  ],
})
export class DashboardModule {}
