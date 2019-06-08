import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserUsersettingBasicComponent } from './basic.component';

describe('UserUsersettingBasicComponent', () => {
  let component: UserUsersettingBasicComponent;
  let fixture: ComponentFixture<UserUsersettingBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserUsersettingBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUsersettingBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
