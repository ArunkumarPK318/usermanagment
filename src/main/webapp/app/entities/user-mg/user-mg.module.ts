import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserManagementSharedModule } from 'app/shared/shared.module';
import { UserMGComponent } from './user-mg.component';
import { UserMGDetailComponent } from './user-mg-detail.component';
import { UserMGUpdateComponent } from './user-mg-update.component';
import { UserMGDeleteDialogComponent } from './user-mg-delete-dialog.component';
import { userMGRoute } from './user-mg.route';

@NgModule({
  imports: [UserManagementSharedModule, RouterModule.forChild(userMGRoute)],
  declarations: [UserMGComponent, UserMGDetailComponent, UserMGUpdateComponent, UserMGDeleteDialogComponent],
  entryComponents: [UserMGDeleteDialogComponent]
})
export class UserManagementUserMGModule {}
