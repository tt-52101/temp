import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserUsersettingComponent } from './usersetting.component';

describe('UserUsersettingComponent', () => {
  let component: UserUsersettingComponent;
  let fixture: ComponentFixture<UserUsersettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserUsersettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUsersettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
