import { Component } from '@angular/core';
import { QuestionComponent } from '../question/question.component';
import {NgForOf, NgIf} from '@angular/common';
import { SelfCheckQuestionComponent } from "../self-check-question/self-check-question.component";
import { selfcheckQuestions } from '../Model/SelfCheck_Questions';

@Component({
  selector: 'app-selfcheck',
  standalone: true,
  imports: [NgIf, SelfCheckQuestionComponent],
  templateUrl: './selfcheck.component.html',
  styleUrls: ['./selfcheck.component.css']
})
export class SelfcheckComponent {
  showFeedback: boolean = false;
  correctCount: number = 0;
  correctPercentage: number = 0;
  currentQuestionIndex: number = 0;
  questions = selfcheckQuestions
  totalWeight = 0;

  onAnswerSelected(question: string, answer: string) {
    //this.totalWeight += this.questions[this.currentQuestionIndex]
    console.log(question)
    this.nextQuestion();
    console.log("dad");
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.evaluateQuiz();
    }
  }

  evaluateQuiz() {

    this.correctPercentage = Math.round(this.totalWeight / this.questions.length * 100);
    console.log(`Total Weight: ${this.totalWeight}, Correct Percentage: ${this.correctPercentage}%`);
    this.showFeedback = true;
  }

  showResults() {
    this.showFeedback = false;
    this.currentQuestionIndex = 0;
  }

  getTitle(): string {
    if (this.correctPercentage <= 30) return "Sie sind gefährdet";
    if (this.correctPercentage <= 60) return "Sie sind wenig gefährdet";
    return "Keine Gefährdung";
  }

  getMessage(): string {
    if (this.correctPercentage <= 30) {
      return "Sie haben eine hohe Gefahr, radikalisiert zu werden. Es ist wichtig, dass Sie sofort die weiteren Hilfsmaßnahmen auf unserer Seite in Anspruch nehmen, um sich und andere zu schützen.";
    }
    if (this.correctPercentage <= 60) {
      return "Sie haben eine moderate Gefahr, radikalisiert zu werden. Wir empfehlen Ihnen, die weiteren Hilfsmaßnahmen auf unserer Seite in Anspruch zu nehmen, um sich besser zu schützen.";
    }
    return "Sie haben keine Gefährdung, radikalisiert zu werden. Bitte bleiben Sie dennoch aufmerksam und informieren Sie sich regelmäßig über aktuelle Entwicklungen.";
  }
}
