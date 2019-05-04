import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolsThermalComponent } from './thermal.component';

describe('ToolsThermalComponent', () => {
  let component: ToolsThermalComponent;
  let fixture: ComponentFixture<ToolsThermalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsThermalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsThermalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
