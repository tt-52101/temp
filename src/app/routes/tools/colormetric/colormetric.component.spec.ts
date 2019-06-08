import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolsColormetricComponent } from './colormetric.component';

describe('ToolsColormetricComponent', () => {
  let component: ToolsColormetricComponent;
  let fixture: ComponentFixture<ToolsColormetricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsColormetricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsColormetricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
