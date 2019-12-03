import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IRoles, Roles } from 'app/shared/model/roles.model';
import { RolesService } from './roles.service';
import { IApp } from 'app/shared/model/app.model';
import { AppService } from 'app/entities/app/app.service';

@Component({
  selector: 'jhi-roles-update',
  templateUrl: './roles-update.component.html'
})
export class RolesUpdateComponent implements OnInit {
  isSaving: boolean;

  apps: IApp[];

  editForm = this.fb.group({
    id: [],
    name: [],
    app: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected rolesService: RolesService,
    protected appService: AppService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ roles }) => {
      this.updateForm(roles);
    });
    this.appService
      .query()
      .subscribe((res: HttpResponse<IApp[]>) => (this.apps = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(roles: IRoles) {
    this.editForm.patchValue({
      id: roles.id,
      name: roles.name,
      app: roles.app
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const roles = this.createFromForm();
    if (roles.id !== undefined) {
      this.subscribeToSaveResponse(this.rolesService.update(roles));
    } else {
      this.subscribeToSaveResponse(this.rolesService.create(roles));
    }
  }

  private createFromForm(): IRoles {
    return {
      ...new Roles(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      app: this.editForm.get(['app']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRoles>>) {
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
