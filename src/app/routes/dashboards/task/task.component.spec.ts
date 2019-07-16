import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RoutesDashboardsTaskComponent } from './task.component';

describe('RoutesDashboardsTaskComponent', () => {
  let component: RoutesDashboardsTaskComponent;
  let fixture: ComponentFixture<RoutesDashboardsTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutesDashboardsTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutesDashboardsTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
