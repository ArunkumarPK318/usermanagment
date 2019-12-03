import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserMG } from 'app/shared/model/user-mg.model';
import { UserMGService } from './user-mg.service';

@Component({
  templateUrl: './user-mg-delete-dialog.component.html'
})
export class UserMGDeleteDialogComponent {
  userMG: IUserMG;

  constructor(protected userMGService: UserMGService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.userMGService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'userMGListModification',
        content: 'Deleted an userMG'
      });
      this.activeModal.dismiss(true);
    });
  }
}
