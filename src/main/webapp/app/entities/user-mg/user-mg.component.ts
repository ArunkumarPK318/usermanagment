import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUserMG } from 'app/shared/model/user-mg.model';
import { UserMGService } from './user-mg.service';
import { UserMGDeleteDialogComponent } from './user-mg-delete-dialog.component';

@Component({
  selector: 'jhi-user-mg',
  templateUrl: './user-mg.component.html'
})
export class UserMGComponent implements OnInit, OnDestroy {
  userMGS: IUserMG[];
  eventSubscriber: Subscription;

  constructor(protected userMGService: UserMGService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.userMGService.query().subscribe((res: HttpResponse<IUserMG[]>) => {
      this.userMGS = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInUserMGS();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IUserMG) {
    return item.id;
  }

  registerChangeInUserMGS() {
    this.eventSubscriber = this.eventManager.subscribe('userMGListModification', () => this.loadAll());
  }

  delete(userMG: IUserMG) {
    const modalRef = this.modalService.open(UserMGDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.userMG = userMG;
  }
}
