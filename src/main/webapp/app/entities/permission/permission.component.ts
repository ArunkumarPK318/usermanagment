import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPermission } from 'app/shared/model/permission.model';
import { PermissionService } from './permission.service';
import { PermissionDeleteDialogComponent } from './permission-delete-dialog.component';

@Component({
  selector: 'jhi-permission',
  templateUrl: './permission.component.html'
})
export class PermissionComponent implements OnInit, OnDestroy {
  permissions: IPermission[];
  eventSubscriber: Subscription;

  constructor(protected permissionService: PermissionService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.permissionService.query().subscribe((res: HttpResponse<IPermission[]>) => {
      this.permissions = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInPermissions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPermission) {
    return item.id;
  }

  registerChangeInPermissions() {
    this.eventSubscriber = this.eventManager.subscribe('permissionListModification', () => this.loadAll());
  }

  delete(permission: IPermission) {
    const modalRef = this.modalService.open(PermissionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.permission = permission;
  }
}
