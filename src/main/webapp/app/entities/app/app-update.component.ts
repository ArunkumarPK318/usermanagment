import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IApp, App } from 'app/shared/model/app.model';
import { AppService } from './app.service';

@Component({
  selector: 'jhi-app-update',
  templateUrl: './app-update.component.html'
})
export class AppUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    type: [],
    vesrion: [],
    urlPath: [],
    name: []
  });

  constructor(protected appService: AppService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ app }) => {
      this.updateForm(app);
    });
  }

  updateForm(app: IApp) {
    this.editForm.patchValue({
      id: app.id,
      type: app.type,
      vesrion: app.vesrion,
      urlPath: app.urlPath,
      name: app.name
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const app = this.createFromForm();
    if (app.id !== undefined) {
      this.subscribeToSaveResponse(this.appService.update(app));
    } else {
      this.subscribeToSaveResponse(this.appService.create(app));
    }
  }

  private createFromForm(): IApp {
    return {
      ...new App(),
      id: this.editForm.get(['id']).value,
      type: this.editForm.get(['type']).value,
      vesrion: this.editForm.get(['vesrion']).value,
      urlPath: this.editForm.get(['urlPath']).value,
      name: this.editForm.get(['name']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IApp>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
