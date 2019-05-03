import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingImportComponent } from './import.component';

describe('SettingImportComponent', () => {
  let component: SettingImportComponent;
  let fixture: ComponentFixture<SettingImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
