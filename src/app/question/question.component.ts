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
  @Input() answers: { text: string, feedback: string }[] = [];
  @Input() correctAnswer: string = "";
  @Input() feedback: string = "";
  @Output() answerSelected = new EventEmitter<string>();
  @Output() nextQuestion = new EventEmitter<void>();

  selectedAnswer: string | null = null;
  showFeedback: boolean = false;
  isCorrect: boolean = false;
  radioDisabled: boolean = false;

  learnSubmitAnswer(answer: string, event: Event) {
    if(!this.radioDisabled) {
      this.showAnswerFeedback();
    }
    else {
      this.radioDisabled = false
      this.showFeedback = false
      this.answerSelected.emit(answer);
      this.selectedAnswer = null;
    }
    event.stopPropagation();
  }

  @Output() selectedAnswerChange = new EventEmitter<string>();

  selectAnswer(answer: string) {
    this.selectedAnswer = answer;
    this.selectedAnswerChange.emit(this.selectedAnswer);
    console.log(this.selectedAnswer);
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
      this.answers.forEach(element => {
        if(element.text == this.selectedAnswer) this.feedback = element.feedback;
      });
    }
  }
}
