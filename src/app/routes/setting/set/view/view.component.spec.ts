import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingSetViewComponent } from './view.component';

describe('SettingSetViewComponent', () => {
  let component: SettingSetViewComponent;
  let fixture: ComponentFixture<SettingSetViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingSetViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingSetViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
