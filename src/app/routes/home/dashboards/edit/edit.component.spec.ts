import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RoutesHomeDashboardsEditComponent } from './edit.component';

describe('RoutesHomeDashboardsEditComponent', () => {
  let component: RoutesHomeDashboardsEditComponent;
  let fixture: ComponentFixture<RoutesHomeDashboardsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutesHomeDashboardsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutesHomeDashboardsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
