import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { UserManagementTestModule } from '../../../test.module';
import { UserMGUpdateComponent } from 'app/entities/user-mg/user-mg-update.component';
import { UserMGService } from 'app/entities/user-mg/user-mg.service';
import { UserMG } from 'app/shared/model/user-mg.model';

describe('Component Tests', () => {
  describe('UserMG Management Update Component', () => {
    let comp: UserMGUpdateComponent;
    let fixture: ComponentFixture<UserMGUpdateComponent>;
    let service: UserMGService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserManagementTestModule],
        declarations: [UserMGUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(UserMGUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserMGUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserMGService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new UserMG(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new UserMG();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
