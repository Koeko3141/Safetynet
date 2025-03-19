import { Component, signal } from '@angular/core';
import storyData from './story.json';
import { CommonModule, NgForOf, NgIf } from '@angular/common';

class Choice {
  text: string = '';
  targetPageNumber: number = 0;
  points: number = 0;
}

class Page {
  pageNumber: number = 0;
  title: string = '';
  content: string = '';
  choices: Choice[] = [];
}

@Component({
  selector: 'app-interactive-story',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './interactive-story.component.html',
  styleUrl: './interactive-story.component.css'
})
export class InteractiveStoryComponent {
  story = storyData;
  currentPage = signal(0);
  radicalizationScore = signal(0);
  pageImage = signal<string>('');
  selectedChoice: Choice | null = null;

  get page(): Page {
    const page = this.story.find(p => p.pageNumber === this.currentPage());
    if (page) {
      // Dynamisch den Bildpfad zuweisen, z.B. assets/webp/StoryPage1.webp, assets/webp/StoryPage2.webp, ...
      return page;
    }
    return {pageNumber: -1, title: "Lade Story...", content: "", choices: []};
  }

  get pageImageUrl(): string {
    return `assets/story-images/storyPage${this.page.pageNumber}.webp`;
  }

  choose(choice: Choice) {
    this.selectedChoice = choice;
  }

  confirmChoice() {
    if (this.selectedChoice) {
      this.radicalizationScore.set(this.radicalizationScore() + this.selectedChoice.points);
      this.currentPage.set(this.selectedChoice.targetPageNumber);
      this.selectedChoice = null;
    }
  }

  restartStory() {
    this.currentPage.set(0);
    this.radicalizationScore.set(0);
    this.selectedChoice = null;
  }

  progressBarWidth(): string {
    // Score kann von -40 bis +40 gehen
    // fraction ist Wert zwischen 0 und 1
    const fraction = Math.min(Math.abs(this.radicalizationScore()) / 40, 1);
    // Wir erlauben maximal 50% Breite (also bis zur Mitte)
    return (fraction * 50) + '%';
  }

  progressBarLeft(): string {
    const score = this.radicalizationScore();

    if (score < 0) {
      // Bei negativem Score soll der Balken nach links wachsen.
      // offset = Anteil an den 50%
      const fraction = Math.min(Math.abs(score) / 40, 1);
      const offset = fraction * 50;
      // Die linke Kante = 50% - offset
      // Beispiel: Score = -40 => offset = 50 => left = 0%
      //           Score = -20 => offset = 25 => left = 25%
      return (50 - offset) + '%';
    } else {
      // Score >= 0 => Balken wächst nach rechts.
      // Dann ist die linke Kante immer bei 50%.
      return '50%';
    }
  }

  progressBarColor(): string {
    const score = this.radicalizationScore();
    if (score < 0) return 'blue';   // z.B. Blau für linke Auslenkung
    if (score > 0) return 'red';    // z.B. Rot für rechte Auslenkung
    return 'transparent';           // Score == 0 => unsichtbar
  }
}
