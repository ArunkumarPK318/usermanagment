import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPermission } from 'app/shared/model/permission.model';
import { PermissionService } from './permission.service';

@Component({
  templateUrl: './permission-delete-dialog.component.html'
})
export class PermissionDeleteDialogComponent {
  permission: IPermission;

  constructor(
    protected permissionService: PermissionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.permissionService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'permissionListModification',
        content: 'Deleted an permission'
      });
      this.activeModal.dismiss(true);
    });
  }
}
