import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserManagementSharedModule } from 'app/shared/shared.module';
import { AppComponent } from './app.component';
import { AppDetailComponent } from './app-detail.component';
import { AppUpdateComponent } from './app-update.component';
import { AppDeleteDialogComponent } from './app-delete-dialog.component';
import { appRoute } from './app.route';

@NgModule({
  imports: [UserManagementSharedModule, RouterModule.forChild(appRoute)],
  declarations: [AppComponent, AppDetailComponent, AppUpdateComponent, AppDeleteDialogComponent],
  entryComponents: [AppDeleteDialogComponent]
})
export class UserManagementAppModule {}
