import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoDrawerComponentComponent } from './demo-drawer-component.component';

describe('DemoDrawerComponentComponent', () => {
  let component: DemoDrawerComponentComponent;
  let fixture: ComponentFixture<DemoDrawerComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoDrawerComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoDrawerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
