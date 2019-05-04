import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolsPhototoolComponent } from './phototool.component';

describe('ToolsPhototoolComponent', () => {
  let component: ToolsPhototoolComponent;
  let fixture: ComponentFixture<ToolsPhototoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsPhototoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsPhototoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
