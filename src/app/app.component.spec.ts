import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render form component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-form')).toBeTruthy();
  });

  it('should render message component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-message')).toBeTruthy();
  });
});
