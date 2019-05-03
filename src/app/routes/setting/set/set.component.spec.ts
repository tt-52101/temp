import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingSetComponent } from './set.component';

describe('SettingSetComponent', () => {
  let component: SettingSetComponent;
  let fixture: ComponentFixture<SettingSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
