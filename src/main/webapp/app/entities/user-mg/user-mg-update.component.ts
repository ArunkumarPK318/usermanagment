import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IUserMG, UserMG } from 'app/shared/model/user-mg.model';
import { UserMGService } from './user-mg.service';
import { IApp } from 'app/shared/model/app.model';
import { AppService } from 'app/entities/app/app.service';

@Component({
  selector: 'jhi-user-mg-update',
  templateUrl: './user-mg-update.component.html'
})
export class UserMGUpdateComponent implements OnInit {
  isSaving: boolean;

  apps: IApp[];

  editForm = this.fb.group({
    id: [],
    firstName: [],
    lastName: [],
    email: [],
    phoneNumber: [],
    app: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected userMGService: UserMGService,
    protected appService: AppService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ userMG }) => {
      this.updateForm(userMG);
    });
    this.appService
      .query()
      .subscribe((res: HttpResponse<IApp[]>) => (this.apps = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(userMG: IUserMG) {
    this.editForm.patchValue({
      id: userMG.id,
      firstName: userMG.firstName,
      lastName: userMG.lastName,
      email: userMG.email,
      phoneNumber: userMG.phoneNumber,
      app: userMG.app
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const userMG = this.createFromForm();
    if (userMG.id !== undefined) {
      this.subscribeToSaveResponse(this.userMGService.update(userMG));
    } else {
      this.subscribeToSaveResponse(this.userMGService.create(userMG));
    }
  }

  private createFromForm(): IUserMG {
    return {
      ...new UserMG(),
      id: this.editForm.get(['id']).value,
      firstName: this.editForm.get(['firstName']).value,
      lastName: this.editForm.get(['lastName']).value,
      email: this.editForm.get(['email']).value,
      phoneNumber: this.editForm.get(['phoneNumber']).value,
      app: this.editForm.get(['app']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserMG>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackAppById(index: number, item: IApp) {
    return item.id;
  }
}
