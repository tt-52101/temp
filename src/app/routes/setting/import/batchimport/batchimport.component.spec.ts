import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingImportBatchimportComponent } from './batchimport.component';

describe('SettingImportBatchimportComponent', () => {
  let component: SettingImportBatchimportComponent;
  let fixture: ComponentFixture<SettingImportBatchimportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingImportBatchimportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingImportBatchimportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
