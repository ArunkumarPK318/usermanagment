import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'app',
        loadChildren: () => import('./app/app.module').then(m => m.UserManagementAppModule)
      },
      {
        path: 'roles',
        loadChildren: () => import('./roles/roles.module').then(m => m.UserManagementRolesModule)
      },
      {
        path: 'permission',
        loadChildren: () => import('./permission/permission.module').then(m => m.UserManagementPermissionModule)
      },
      {
        path: 'user-mg',
        loadChildren: () => import('./user-mg/user-mg.module').then(m => m.UserManagementUserMGModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class UserManagementEntityModule {}
