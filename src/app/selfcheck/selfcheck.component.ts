import { Component } from '@angular/core';
import { QuestionComponent } from '../question/question.component';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-selfcheck',
  standalone: true,
  imports: [QuestionComponent, NgForOf, NgIf],
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

  onAnswerSelected(question: string, answer: string) {
    this.selectedAnswers[question] = answer;
  }

  evaluateQuiz() {
    this.correctCount = 0;
    this.questions.forEach(q => {
      if (this.selectedAnswers[q.question] === q.correctAnswer) {
        this.correctCount++;
      }
    });
    this.showFeedback = true;
  }
}
