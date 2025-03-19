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
        { text: "Rome", weight: 100 },
        { text: "Paris", weight: 0 },
        { text: "Berlin", weight: 0 },
        { text: "Madrid", weight: 0 }
      ],
      correctAnswer: "Rome",
      feedback: "Rome is the capital of Italy."
    },
    {
      question: "What is the capital of Germany?",
      answers: [
        { text: "Rome", weight: 0 },
        { text: "Paris", weight: 0 },
        { text: "Berlin", weight: 100 },
        { text: "Madrid", weight: 0 }

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
    this.questions.forEach(q => {
      if (this.selectedAnswers[q.question] === q.correctAnswer) {
        this.correctCount++;
      }
    });
    this.correctPercentage = Math.round(this.correctCount / this.questions.length * 100);
    console.log(`Correct Count: ${this.correctCount}, Correct Percentage: ${this.correctPercentage}%`);
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
      return "Gefährdung.";
    }
    if (this.correctPercentage <= 60) {
      return "Mittelmäßig";
    }
    return "Kein Risiko.";
  }
}
