import { Component } from '@angular/core';
import { QuestionComponent } from '../question/question.component';
import {NgForOf, NgIf} from '@angular/common';
import { SelfCheckQuestionComponent } from "../self-check-question/self-check-question.component";
import { selfcheckQuestions } from '../Model/SelfCheck_Questions';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-selfcheck',
  standalone: true,
  imports: [NgIf, SelfCheckQuestionComponent, RouterLink],
  templateUrl: './selfcheck.component.html',
  styleUrls: ['./selfcheck.component.css']
})
export class SelfcheckComponent {
  showFeedback: boolean = false;
  correctCount: number = 0;
  correctPercentage: number = 0;
  currentQuestionIndex: number = 0;
  questions = selfcheckQuestions
  totalWeight: number = 0;

  onAnswerSelected(question: string, answer: string) {
    this.questions[this.currentQuestionIndex].answers.forEach( element => {
      if(element.answer == answer) {
        this.totalWeight += element.weight;
      }
    });
    console.log(this.totalWeight)
    this.nextQuestion();
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
    if (this.correctPercentage <= 20) return "Keine Gefährdung";
    if (this.correctPercentage <= 50) return "Sie sind wenig gefährdet";
    return "Sie sind gefährdet";
  }

  getMessage(): string {
    if (this.correctPercentage <= 20) {
      return "Sie haben keine Gefährdung, radikalisiert zu werden. Bitte bleiben Sie dennoch aufmerksam und informieren Sie sich regelmäßig über aktuelle Entwicklungen.";
    }
    if (this.correctPercentage <= 50) {
      return "Sie haben eine moderate Gefahr, radikalisiert zu werden. Wir empfehlen Ihnen, die weiteren Hilfsmaßnahmen auf unserer Seite in Anspruch zu nehmen, um sich besser zu schützen.";
    }
    return "Sie haben eine hohe Gefahr, radikalisiert zu werden. Es ist wichtig, dass Sie sofort die weiteren Hilfsmaßnahmen auf unserer Seite in Anspruch nehmen, um sich und andere zu schützen.";
  }
}
