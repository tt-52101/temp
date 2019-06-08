import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RoutesHomePersonelComponent } from './personel.component';

describe('RoutesHomePersonelComponent', () => {
  let component: RoutesHomePersonelComponent;
  let fixture: ComponentFixture<RoutesHomePersonelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutesHomePersonelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutesHomePersonelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
