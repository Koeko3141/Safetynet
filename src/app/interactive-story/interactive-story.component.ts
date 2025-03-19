import {Component, signal} from '@angular/core';
import storyData from './story.json';
import {NgForOf, NgIf} from "@angular/common";

class Choice {
  text: string = '';
  targetPageNumber: number = 0;  // Standardwert 0
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
    NgIf,
    NgForOf
  ],
  templateUrl: './interactive-story.component.html',
  styleUrl: './interactive-story.component.css'
})
export class InteractiveStoryComponent {

  story: Page[] = storyData; // ✅ JSON-Daten in die Story laden
  currentPage = signal(0);  // Startseite

  get page(): Page {
    return this.story.find(p => p.pageNumber === this.currentPage()) ?? {
      pageNumber: -1, title: "Lade Story...", content: "", choices: []
    };
  }


  choose(choice: Choice) {
    this.currentPage.set(choice.targetPageNumber);
  }

  restartStory() {
    this.currentPage.set(0);
  }
}
