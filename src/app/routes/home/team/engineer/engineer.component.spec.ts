import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeTeamEngineerComponent } from './engineer.component';

describe('HomeTeamEngineerComponent', () => {
  let component: HomeTeamEngineerComponent;
  let fixture: ComponentFixture<HomeTeamEngineerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTeamEngineerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTeamEngineerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
