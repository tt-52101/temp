import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserUsersettingSecurityComponent } from './security.component';

describe('UserUsersettingSecurityComponent', () => {
  let component: UserUsersettingSecurityComponent;
  let fixture: ComponentFixture<UserUsersettingSecurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserUsersettingSecurityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUsersettingSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
