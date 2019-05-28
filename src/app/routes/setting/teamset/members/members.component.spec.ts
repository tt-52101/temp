import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingTeamsetMembersComponent } from './members.component';

describe('SettingTeamsetMembersComponent', () => {
  let component: SettingTeamsetMembersComponent;
  let fixture: ComponentFixture<SettingTeamsetMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingTeamsetMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingTeamsetMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
