import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingImportSingleimportComponent } from './singleimport.component';

describe('SettingImportSingleimportComponent', () => {
  let component: SettingImportSingleimportComponent;
  let fixture: ComponentFixture<SettingImportSingleimportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingImportSingleimportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingImportSingleimportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
