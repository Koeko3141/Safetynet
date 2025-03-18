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

  selectedAnswer: string | null = null;

  selectAnswer(answer: string, event: Event) {
    event.stopPropagation(); // Prevent bubbling issues
    this.selectedAnswer = answer;
    this.answerSelected.emit(answer);
  }

  getAnswerClass(answer: string): string {
    if (this.selectedAnswer === null) return "";
    if (answer === this.correctAnswer) {
      return "correct-answer"; // Green highlight
    } else if (answer === this.selectedAnswer) {
      return "wrong-answer"; // Red highlight
    }
    return "";
  }
}
