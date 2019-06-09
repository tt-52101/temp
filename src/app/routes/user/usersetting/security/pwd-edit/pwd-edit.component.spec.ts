import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserUsersettingSecurityPwdEditComponent } from './pwd-edit.component';

describe('UserUsersettingSecurityPwdEditComponent', () => {
  let component: UserUsersettingSecurityPwdEditComponent;
  let fixture: ComponentFixture<UserUsersettingSecurityPwdEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserUsersettingSecurityPwdEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUsersettingSecurityPwdEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
