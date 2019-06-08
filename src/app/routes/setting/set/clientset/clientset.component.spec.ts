import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingSetClientsetComponent } from './clientset.component';

describe('SettingSetClientsetComponent', () => {
  let component: SettingSetClientsetComponent;
  let fixture: ComponentFixture<SettingSetClientsetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingSetClientsetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingSetClientsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
