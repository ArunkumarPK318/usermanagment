import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { UserManagementTestModule } from '../../../test.module';
import { UserMGDeleteDialogComponent } from 'app/entities/user-mg/user-mg-delete-dialog.component';
import { UserMGService } from 'app/entities/user-mg/user-mg.service';

describe('Component Tests', () => {
  describe('UserMG Management Delete Component', () => {
    let comp: UserMGDeleteDialogComponent;
    let fixture: ComponentFixture<UserMGDeleteDialogComponent>;
    let service: UserMGService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserManagementTestModule],
        declarations: [UserMGDeleteDialogComponent]
      })
        .overrideTemplate(UserMGDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UserMGDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserMGService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
