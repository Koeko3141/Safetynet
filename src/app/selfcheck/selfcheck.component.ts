import { Component } from '@angular/core';
import { QuestionComponent } from '../question/question.component';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-selfcheck',
  standalone: true,
  imports: [QuestionComponent, NgIf],
  templateUrl: './selfcheck.component.html',
  styleUrls: ['./selfcheck.component.css']
})
export class SelfcheckComponent {
  questions = [
    {
      question: "What is the capital of Italy?",
      answers: [
        { text: "Rome", weight: 1 },
        { text: "Paris", weight: 0.5 },
        { text: "Berlin", weight: 0.5 },
        { text: "Madrid", weight: 0 }
      ],
      correctAnswer: "Rome",
      feedback: "Rome is the capital of Italy."
    },
    {
      question: "What is the capital of Germany?",
      answers: [
        { text: "Rome", weight: 0.5 },
        { text: "Paris", weight: 0 },
        { text: "Berlin", weight: 1 },
        { text: "Madrid", weight: 0.5 }

      ],
      correctAnswer: "Berlin",
      feedback: "Berlin is the capital of Germany."
    }
  ];

  selectedAnswers: { [key: string]: string } = {};
  showFeedback: boolean = false;
  correctCount: number = 0;
  correctPercentage: number = 0;
  currentQuestionIndex: number = 0;

  onAnswerSelected(question: string, answer: string) {
    this.selectedAnswers[question] = answer;
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
    let totalWeight = 0;
    this.questions.forEach(q => {
      const selectedAnswer = this.selectedAnswers[q.question];
      const answer = q.answers.find(a => a.text === selectedAnswer);
      if (answer) {
        totalWeight += answer.weight;
      }
    });
    this.correctPercentage = Math.round(totalWeight / this.questions.length * 100);
    console.log(`Total Weight: ${totalWeight}, Correct Percentage: ${this.correctPercentage}%`);
    this.showFeedback = true;
  }

  showResults() {
    this.showFeedback = false;
    this.selectedAnswers = {};
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
