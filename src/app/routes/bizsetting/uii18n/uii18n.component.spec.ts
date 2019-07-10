import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BizsettingUIi18nComponent } from './uii18n.component';

describe('BizsettingUIi18nComponent', () => {
  let component: BizsettingUIi18nComponent;
  let fixture: ComponentFixture<BizsettingUIi18nComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizsettingUIi18nComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizsettingUIi18nComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
