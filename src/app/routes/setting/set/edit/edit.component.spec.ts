import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingSetEditComponent } from './edit.component';

describe('SettingSetEditComponent', () => {
  let component: SettingSetEditComponent;
  let fixture: ComponentFixture<SettingSetEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingSetEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingSetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
