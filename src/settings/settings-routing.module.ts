import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FormMode } from 'src/enums/form-mode.enum';
import { FormConfig } from 'src/interfaces';
import { UserPreferencesComponent } from './user-preferences/user-preferences.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: 'user-profile/view',
        component: UserProfileComponent,
        data: {
          formConfig: {
            mode: FormMode.view,
            headerText: 'View User Profile',
          } as FormConfig,
        },
      },
      {
        path: 'user-profile/edit',
        component: UserProfileComponent,
        data: {
          formConfig: {
            mode: FormMode.edit,
            headerText: 'Edit User Profile',
          } as FormConfig,
        },
      },
      {
        path: 'user-preferences/view',
        component: UserPreferencesComponent,
        data: {
          formConfig: {
            mode: FormMode.view,
            headerText: 'View User Preferences',
          } as FormConfig,
        },
      },
      {
        path: 'user-preferences/edit',
        component: UserPreferencesComponent,
        data: {
          formConfig: {
            mode: FormMode.edit,
            headerText: 'Edit User Preferences',
          } as FormConfig,
        },
      },
    ],
  },
  {
    path: '',
    redirectTo: 'user-profile/view',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
