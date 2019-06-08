import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingImportViewimportComponent } from './viewimport.component';

describe('SettingImportViewimportComponent', () => {
  let component: SettingImportViewimportComponent;
  let fixture: ComponentFixture<SettingImportViewimportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingImportViewimportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingImportViewimportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
