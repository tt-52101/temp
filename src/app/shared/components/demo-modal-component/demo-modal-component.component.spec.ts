import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoModalComponentComponent } from './demo-modal-component.component';

describe('DemoModalComponentComponent', () => {
  let component: DemoModalComponentComponent;
  let fixture: ComponentFixture<DemoModalComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoModalComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
