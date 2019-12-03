import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UserManagementTestModule } from '../../../test.module';
import { UserMGDetailComponent } from 'app/entities/user-mg/user-mg-detail.component';
import { UserMG } from 'app/shared/model/user-mg.model';

describe('Component Tests', () => {
  describe('UserMG Management Detail Component', () => {
    let comp: UserMGDetailComponent;
    let fixture: ComponentFixture<UserMGDetailComponent>;
    const route = ({ data: of({ userMG: new UserMG(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UserManagementTestModule],
        declarations: [UserMGDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(UserMGDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UserMGDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.userMG).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
