import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UserManagementTestModule } from '../../../test.module';
import { UserMGComponent } from 'app/entities/user-mg/user-mg.component';
import { UserMGService } from 'app/entities/user-mg/user-mg.service';
import { UserMG } from 'app/shared/model/user-mg.model';

describe('Component Tests', () => {
  describe('UserMG Management Component', () => {
    let comp: UserMGComponent;
    let fixture: ComponentFixture<UserMGComponent>;
    let service: UserMGService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserManagementTestModule],
        declarations: [UserMGComponent],
        providers: []
      })
        .overrideTemplate(UserMGComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserMGComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserMGService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new UserMG(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.userMGS[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
