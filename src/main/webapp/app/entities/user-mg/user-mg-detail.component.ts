import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserMG } from 'app/shared/model/user-mg.model';

@Component({
  selector: 'jhi-user-mg-detail',
  templateUrl: './user-mg-detail.component.html'
})
export class UserMGDetailComponent implements OnInit {
  userMG: IUserMG;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ userMG }) => {
      this.userMG = userMG;
    });
  }

  previousState() {
    window.history.back();
  }
}
