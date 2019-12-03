import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Permission } from 'app/shared/model/permission.model';
import { PermissionService } from './permission.service';
import { PermissionComponent } from './permission.component';
import { PermissionDetailComponent } from './permission-detail.component';
import { PermissionUpdateComponent } from './permission-update.component';
import { IPermission } from 'app/shared/model/permission.model';

@Injectable({ providedIn: 'root' })
export class PermissionResolve implements Resolve<IPermission> {
  constructor(private service: PermissionService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPermission> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((permission: HttpResponse<Permission>) => permission.body));
    }
    return of(new Permission());
  }
}

export const permissionRoute: Routes = [
  {
    path: '',
    component: PermissionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Permissions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PermissionDetailComponent,
    resolve: {
      permission: PermissionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Permissions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PermissionUpdateComponent,
    resolve: {
      permission: PermissionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Permissions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PermissionUpdateComponent,
    resolve: {
      permission: PermissionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Permissions'
    },
    canActivate: [UserRouteAccessService]
  }
];
