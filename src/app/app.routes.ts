import { Routes } from '@angular/router';
import {StartPageComponent} from "./start-page/start-page.component";
import {SelfcheckComponent} from "./selfcheck/selfcheck.component";
import {LearningQuizComponent} from "./learning-quiz/learning-quiz.component";
import {InteractiveStoryComponent} from "./interactive-story/interactive-story.component";

export const routes: Routes = [
  {path: '', redirectTo: StartPageComponent, pathMatch: 'full'},
  {path: 'self-check', pathMatch: 'full', component: SelfcheckComponent},
  {path: 'learning-quiz', pathMatch: 'full', component: LearningQuizComponent},
  {path: 'interactive-story', pathMatch: 'full', component: InteractiveStoryComponent},
];
