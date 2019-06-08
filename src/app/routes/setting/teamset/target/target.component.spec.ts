import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingTeamsetTargetComponent } from './target.component';

describe('SettingTeamsetTargetComponent', () => {
  let component: SettingTeamsetTargetComponent;
  let fixture: ComponentFixture<SettingTeamsetTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingTeamsetTargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingTeamsetTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
