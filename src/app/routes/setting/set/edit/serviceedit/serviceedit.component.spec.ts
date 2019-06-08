import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingSetEditServiceeditComponent } from './serviceedit.component';

describe('SettingSetEditServiceeditComponent', () => {
  let component: SettingSetEditServiceeditComponent;
  let fixture: ComponentFixture<SettingSetEditServiceeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingSetEditServiceeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingSetEditServiceeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
