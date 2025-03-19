import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForOf, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    NgIf
  ],
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  @Input() question: string = "";
  @Input() answers: { text: string, weight: number }[] = [];
  @Input() correctAnswer: string = "";
  @Input() feedback: string = "";
  @Input() isSelfCheck: boolean = false;
  @Output() answerSelected = new EventEmitter<string>();
  @Output() nextQuestion = new EventEmitter<void>();


  selectedAnswer: string | null = null;
  showFeedback: boolean = false;
  isCorrect: boolean = false;
  radioDisabled: boolean = false;

  selfSubmitAnswer(answer: string | null, event: Event) {
    this.selectedAnswer = answer;

    this.answerSelected.emit(answer ?? undefined);
    event.stopPropagation();
  }

  learnSubmitAnswer(answer: string, event: Event) {
    if(!this.radioDisabled) {
      this.showAnswerFeedback();
    }
    else {
      this.radioDisabled = false
      this.showFeedback = false
      this.answerSelected.emit(answer);
    }
    event.stopPropagation();
  }

  selectAnswer(answer: string) {
    this.selectedAnswer = answer;
  }

  getAnswerClass(answer: string): string {
    if (this.selectedAnswer === null || !this.radioDisabled) return "";
    if (answer === this.correctAnswer) {
      return "correct-answer"; // Green highlight
    } else if (answer === this.selectedAnswer) {
      return "wrong-answer"; // Red highlight
    }
    return "";
  }

  showAnswerFeedback() {
    if (this.selectedAnswer !== null) {
      this.isCorrect = this.selectedAnswer === this.correctAnswer;
      this.showFeedback = true;
      this.radioDisabled = true;
    }
  }
}
