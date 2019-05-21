import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RoutesHomeTeamJobinchartComponent } from './jobinchart.component';

describe('RoutesHomeTeamJobinchartComponent', () => {
  let component: RoutesHomeTeamJobinchartComponent;
  let fixture: ComponentFixture<RoutesHomeTeamJobinchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutesHomeTeamJobinchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutesHomeTeamJobinchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
