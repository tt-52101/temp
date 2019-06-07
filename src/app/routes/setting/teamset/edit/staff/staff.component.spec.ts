import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingTeamsetEditStaffComponent } from './staff.component';

describe('SettingTeamsetEditStaffComponent', () => {
  let component: SettingTeamsetEditStaffComponent;
  let fixture: ComponentFixture<SettingTeamsetEditStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingTeamsetEditStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingTeamsetEditStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
