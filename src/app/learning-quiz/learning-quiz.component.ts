import { Component } from '@angular/core';
import { QuestionComponent } from '../question/question.component';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-learning-quiz',
  standalone: true,
  imports: [QuestionComponent, NgIf],
  templateUrl: './learning-quiz.component.html',
  styleUrls: ['./learning-quiz.component.css']
})
export class LearningQuizComponent {
  currentQuestionIndex: number = 0
  questions = [
    {
      question: "What is the capital of France?",
      answers: [
        { text: "Paris", weight: 100 },
        { text: "London", weight: 0 },
        { text: "Berlin", weight: 0 },
        { text: "Madrid", weight: 0 }
      ],
      correctAnswer: "Paris",
      feedback: "Paris is the capital of France."
    },
    {
      question: "What is the capital of Spain?",
      answers: [
        { text: "Paris", weight: 0 },
        { text: "London", weight: 0 },
        { text: "Berlin", weight: 0 },
        { text: "Madrid", weight: 100 }
      ],
      correctAnswer: "Madrid",
      feedback: "Madrid is the capital of Spain."
    }
  ];

  onAnswerSelected(question: string, answer: string) {
    // Handle any additional logic when an answer is selected
    console.log("test")
    this.currentQuestionIndex++
  }
}
