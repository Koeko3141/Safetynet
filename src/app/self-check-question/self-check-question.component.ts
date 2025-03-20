import { NgClass, NgForOf, NgIf } from '@angular/common';
import {  Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-self-check-question',
  standalone: true,
  imports: [NgForOf, NgIf, NgClass],
  templateUrl: './self-check-question.component.html',
  styleUrl: './self-check-question.component.css'
})
export class SelfCheckQuestionComponent {
  @Input() question: string = "";
  @Input() answers: { answer: string, weight: number}[] = [];
  @Output() answerSelected = new EventEmitter<string>();
  @Output() nextQuestion = new EventEmitter<void>();

  selectedAnswer: string | null = null;
  isCorrect: boolean = false;

  selfSubmitAnswer(answer: string | null, event: Event) {
    this.selectedAnswer = answer;

    this.answerSelected.emit(answer ?? undefined);
    this.selectedAnswer = null;
    event.stopPropagation();
  }

  selectAnswer(answer: string) {
    this.selectedAnswer = answer;
  }

}
