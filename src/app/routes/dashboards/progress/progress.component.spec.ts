import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RoutesDashboardsProgressComponent } from './progress.component';

describe('RoutesDashboardsProgressComponent', () => {
  let component: RoutesDashboardsProgressComponent;
  let fixture: ComponentFixture<RoutesDashboardsProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutesDashboardsProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutesDashboardsProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
