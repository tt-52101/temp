import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RoutesComponentsProjectDrawerViewComponent } from './project-drawer-view.component';

describe('RoutesComponentsProjectDrawerViewComponent', () => {
  let component: RoutesComponentsProjectDrawerViewComponent;
  let fixture: ComponentFixture<RoutesComponentsProjectDrawerViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutesComponentsProjectDrawerViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutesComponentsProjectDrawerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
