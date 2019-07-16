import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePersonelProjectComponent } from './project.component';

describe('HomePersonelProjectComponent', () => {
  let component: HomePersonelProjectComponent;
  let fixture: ComponentFixture<HomePersonelProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePersonelProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePersonelProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
