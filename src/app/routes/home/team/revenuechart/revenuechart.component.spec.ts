import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RoutesHomeTeamRevenuechartComponent } from './revenuechart.component';

describe('RoutesHomeTeamRevenuechartComponent', () => {
  let component: RoutesHomeTeamRevenuechartComponent;
  let fixture: ComponentFixture<RoutesHomeTeamRevenuechartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutesHomeTeamRevenuechartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutesHomeTeamRevenuechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
