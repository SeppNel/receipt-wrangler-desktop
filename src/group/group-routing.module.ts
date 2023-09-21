import { FormMode } from 'src/enums/form-mode.enum';
import { GroupRoleGuard } from 'src/guards/group-role.guard';
import { FormConfig } from 'src/interfaces/form-config.interface';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupMember } from '@receipt-wrangler/receipt-wrangler-core';

import { GroupFormComponent } from './group-form/group-form.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupResolverService } from './resolvers/group-resolver.service';
import { GroupSettingsComponent } from './group-settings/group-settings.component';
import { developmentGuard } from 'src/guards/development.guard';
import { GroupTabsComponent } from './group-tabs/group-tabs.component';

const routes: Routes = [
  {
    path: '',
    component: GroupListComponent,
  },
  {
    path: 'create',
    component: GroupFormComponent,
    data: {
      formConfig: {
        mode: FormMode.add,
        headerText: 'Create Group',
      } as FormConfig,
    },
  },
  {
    path: ':id',
    component: GroupTabsComponent,
    resolve: {
      group: GroupResolverService,
    },
    data: {
      formConfig: {
        mode: FormMode.view,
        headerText: 'View Group',
      } as FormConfig,
      groupRole: GroupMember.GroupRoleEnum.VIEWER,
    },
    canActivate: [GroupRoleGuard],
    children: [
      {
        path: 'details/view',
        component: GroupFormComponent,
        resolve: {
          group: GroupResolverService,
        },
        data: {
          formConfig: {
            mode: FormMode.view,
            headerText: 'View Group',
          } as FormConfig,
          groupRole: GroupMember.GroupRoleEnum.VIEWER,
          entityType: 'Details',
          setHeaderText: true,
        },
        canActivate: [GroupRoleGuard],
      },
      {
        path: 'details/edit',
        component: GroupFormComponent,
        resolve: {
          group: GroupResolverService,
        },
        data: {
          formConfig: {
            mode: FormMode.edit,
          } as FormConfig,
          groupRole: GroupMember.GroupRoleEnum.OWNER,
          entityType: 'Details',
          setHeaderText: true,
        },
        canActivate: [GroupRoleGuard],
      },
      {
        path: 'settings/view',
        component: GroupSettingsComponent,
        resolve: {
          group: GroupResolverService,
        },
        data: {
          formConfig: {
            mode: FormMode.view,
          } as FormConfig,
          setHeaderText: true,
          entityType: 'Settings',
          groupRole: GroupMember.GroupRoleEnum.OWNER,
        },
        canActivate: [GroupRoleGuard],
      },
      {
        path: 'settings/edit',
        component: GroupSettingsComponent,
        resolve: {
          group: GroupResolverService,
        },
        data: {
          formConfig: {
            mode: FormMode.edit,
          } as FormConfig,
          setHeaderText: true,
          entityType: 'Settings',
          groupRole: GroupMember.GroupRoleEnum.OWNER,
        },
        canActivate: [GroupRoleGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupRoutingModule {}
