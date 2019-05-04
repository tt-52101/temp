import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolsPhotometricComponent } from './photometric.component';

describe('ToolsPhotometricComponent', () => {
  let component: ToolsPhotometricComponent;
  let fixture: ComponentFixture<ToolsPhotometricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsPhotometricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsPhotometricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
