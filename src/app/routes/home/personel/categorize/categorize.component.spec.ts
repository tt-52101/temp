import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePersonelCategorizeComponent } from './categorize.component';

describe('HomePersonelCategorizeComponent', () => {
  let component: HomePersonelCategorizeComponent;
  let fixture: ComponentFixture<HomePersonelCategorizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePersonelCategorizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePersonelCategorizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
