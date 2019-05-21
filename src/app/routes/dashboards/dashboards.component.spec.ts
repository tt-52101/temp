import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RoutesHomeDashboardsComponent } from './dashboards.component';

describe('RoutesHomeDashboardsComponent', () => {
  let component: RoutesHomeDashboardsComponent;
  let fixture: ComponentFixture<RoutesHomeDashboardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutesHomeDashboardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutesHomeDashboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
