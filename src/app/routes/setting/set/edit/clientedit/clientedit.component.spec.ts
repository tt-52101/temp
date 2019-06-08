import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingSetEditClienteditComponent } from './clientedit.component';

describe('SettingSetEditClienteditComponent', () => {
  let component: SettingSetEditClienteditComponent;
  let fixture: ComponentFixture<SettingSetEditClienteditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingSetEditClienteditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingSetEditClienteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
