import { Component } from '@angular/core';
import { QuestionComponent } from '../question/question.component';
import { NgForOf, NgIf } from '@angular/common';
import{questionList} from '../Model/Quiz_Questions';

@Component({
  selector: 'app-learning-quiz',
  standalone: true,
  imports: [QuestionComponent, NgIf],
  templateUrl: './learning-quiz.component.html',
  styleUrls: ['./learning-quiz.component.css']
})
export class LearningQuizComponent {
  currentQuestionIndex: number = 0
  correctCounter: number = 0;
  showFeedback: boolean = false;
  questions = questionList;

  onAnswerSelected(question: string, answer: string) {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    if (answer === currentQuestion.correctAnswer) {
      this.correctCounter++;
    }
    this.nextQuestion();
  }

  nextQuestion() {
    if (this.currentQuestionIndex < questionList.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.showFeedback = true;
    }
  }

  getMessage(): string {
    const percentage = (this.correctCounter / questionList.length) * 100;
    if (percentage >= 80) {
      return `Gute Arbeit! Du hast ${this.correctCounter} von ${questionList.length} Fragen richtig beantwortet.`;
    } else if (percentage >= 60) {
      return `Das könnte besser sein. Du hast ${this.correctCounter} von ${questionList.length} Fragen richtig beantwortet.`;
    } else {
      return `Das lief leider gar nicht gut. Du hast ${this.correctCounter} von ${questionList.length} Fragen richtig beantwortet.`;
    }
  }

  restartQuiz() {
    this.currentQuestionIndex = 0;
    this.correctCounter = 0;
    this.showFeedback = false;
  }
}
