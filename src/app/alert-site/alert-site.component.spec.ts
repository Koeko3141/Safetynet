import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertSiteComponent } from './alert-site.component';

describe('AlertSiteComponent', () => {
  let component: AlertSiteComponent;
  let fixture: ComponentFixture<AlertSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertSiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
