import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserMG } from 'app/shared/model/user-mg.model';
import { UserMGService } from './user-mg.service';
import { UserMGComponent } from './user-mg.component';
import { UserMGDetailComponent } from './user-mg-detail.component';
import { UserMGUpdateComponent } from './user-mg-update.component';
import { IUserMG } from 'app/shared/model/user-mg.model';

@Injectable({ providedIn: 'root' })
export class UserMGResolve implements Resolve<IUserMG> {
  constructor(private service: UserMGService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUserMG> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((userMG: HttpResponse<UserMG>) => userMG.body));
    }
    return of(new UserMG());
  }
}

export const userMGRoute: Routes = [
  {
    path: '',
    component: UserMGComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'UserMGS'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: UserMGDetailComponent,
    resolve: {
      userMG: UserMGResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'UserMGS'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: UserMGUpdateComponent,
    resolve: {
      userMG: UserMGResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'UserMGS'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: UserMGUpdateComponent,
    resolve: {
      userMG: UserMGResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'UserMGS'
    },
    canActivate: [UserRouteAccessService]
  }
];
