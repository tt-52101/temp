import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RoutesDashboardsProjectdetailsComponent } from './projectdetails.component';

describe('RoutesDashboardsProjectdetailsComponent', () => {
  let component: RoutesDashboardsProjectdetailsComponent;
  let fixture: ComponentFixture<RoutesDashboardsProjectdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutesDashboardsProjectdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutesDashboardsProjectdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
