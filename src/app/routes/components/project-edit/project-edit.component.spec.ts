import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RoutesComponentsProjectEditComponent } from './project-edit.component';

describe('RoutesComponentsProjectEditComponent', () => {
  let component: RoutesComponentsProjectEditComponent;
  let fixture: ComponentFixture<RoutesComponentsProjectEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutesComponentsProjectEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutesComponentsProjectEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
