import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingSetServicesetComponent } from './serviceset.component';

describe('SettingSetServicesetComponent', () => {
  let component: SettingSetServicesetComponent;
  let fixture: ComponentFixture<SettingSetServicesetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingSetServicesetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingSetServicesetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
