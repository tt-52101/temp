import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeTeamAnalysisComponent } from './analysis.component';

describe('HomeTeamAnalysisComponent', () => {
  let component: HomeTeamAnalysisComponent;
  let fixture: ComponentFixture<HomeTeamAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTeamAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTeamAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
