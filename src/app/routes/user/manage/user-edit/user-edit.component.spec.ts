import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserManageUserEditComponent } from './user-edit.component';

describe('UserManageUserEditComponent', () => {
  let component: UserManageUserEditComponent;
  let fixture: ComponentFixture<UserManageUserEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManageUserEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManageUserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
