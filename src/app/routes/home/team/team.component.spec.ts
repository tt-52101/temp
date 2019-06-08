import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RoutesHomeTeamComponent } from './team.component';

describe('RoutesHomeTeamComponent', () => {
  let component: RoutesHomeTeamComponent;
  let fixture: ComponentFixture<RoutesHomeTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutesHomeTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutesHomeTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
