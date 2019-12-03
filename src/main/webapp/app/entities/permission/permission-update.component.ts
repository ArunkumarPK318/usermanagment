import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IPermission, Permission } from 'app/shared/model/permission.model';
import { PermissionService } from './permission.service';
import { IRoles } from 'app/shared/model/roles.model';
import { RolesService } from 'app/entities/roles/roles.service';

@Component({
  selector: 'jhi-permission-update',
  templateUrl: './permission-update.component.html'
})
export class PermissionUpdateComponent implements OnInit {
  isSaving: boolean;

  roles: IRoles[];

  editForm = this.fb.group({
    id: [],
    name: [],
    roles: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected permissionService: PermissionService,
    protected rolesService: RolesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ permission }) => {
      this.updateForm(permission);
    });
    this.rolesService
      .query()
      .subscribe((res: HttpResponse<IRoles[]>) => (this.roles = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(permission: IPermission) {
    this.editForm.patchValue({
      id: permission.id,
      name: permission.name,
      roles: permission.roles
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const permission = this.createFromForm();
    if (permission.id !== undefined) {
      this.subscribeToSaveResponse(this.permissionService.update(permission));
    } else {
      this.subscribeToSaveResponse(this.permissionService.create(permission));
    }
  }

  private createFromForm(): IPermission {
    return {
      ...new Permission(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      roles: this.editForm.get(['roles']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPermission>>) {
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

  trackRolesById(index: number, item: IRoles) {
    return item.id;
  }
}
