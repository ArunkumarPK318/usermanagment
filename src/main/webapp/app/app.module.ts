import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { UserManagementSharedModule } from 'app/shared/shared.module';
import { UserManagementCoreModule } from 'app/core/core.module';
import { UserManagementAppRoutingModule } from './app-routing.module';
import { UserManagementHomeModule } from './home/home.module';
import { UserManagementEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    UserManagementSharedModule,
    UserManagementCoreModule,
    UserManagementHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    UserManagementEntityModule,
    UserManagementAppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class UserManagementAppModule {}
