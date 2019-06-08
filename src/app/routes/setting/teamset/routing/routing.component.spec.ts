import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingTeamsetRoutingComponent } from './routing.component';

describe('SettingTeamsetRoutingComponent', () => {
  let component: SettingTeamsetRoutingComponent;
  let fixture: ComponentFixture<SettingTeamsetRoutingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingTeamsetRoutingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingTeamsetRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
