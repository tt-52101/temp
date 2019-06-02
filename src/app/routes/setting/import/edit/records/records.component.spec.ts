import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingImportEditRecordsComponent } from './records.component';

describe('SettingImportEditRecordsComponent', () => {
  let component: SettingImportEditRecordsComponent;
  let fixture: ComponentFixture<SettingImportEditRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingImportEditRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingImportEditRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
