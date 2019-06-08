import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingImportEditProjectComponent } from './project.component';

describe('SettingImportEditProjectComponent', () => {
  let component: SettingImportEditProjectComponent;
  let fixture: ComponentFixture<SettingImportEditProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingImportEditProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingImportEditProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
