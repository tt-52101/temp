import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingTeamsetEditMonthlyDataEditComponent } from './monthly-data-edit.component';

describe('SettingTeamsetEditMonthlyDataEditComponent', () => {
  let component: SettingTeamsetEditMonthlyDataEditComponent;
  let fixture: ComponentFixture<SettingTeamsetEditMonthlyDataEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingTeamsetEditMonthlyDataEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingTeamsetEditMonthlyDataEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
