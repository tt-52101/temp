import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingTeamsetComponent } from './teamset.component';

describe('SettingTeamsetComponent', () => {
  let component: SettingTeamsetComponent;
  let fixture: ComponentFixture<SettingTeamsetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingTeamsetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingTeamsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
