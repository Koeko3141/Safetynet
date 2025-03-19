import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfCheckQuestionComponent } from './self-check-question.component';

describe('SelfCheckQuestionComponent', () => {
  let component: SelfCheckQuestionComponent;
  let fixture: ComponentFixture<SelfCheckQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelfCheckQuestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfCheckQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
