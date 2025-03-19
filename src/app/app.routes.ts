import { Routes } from '@angular/router';
import { StartPageComponent } from "./start-page/start-page.component";
import { SelfcheckComponent } from "./selfcheck/selfcheck.component";
import { LearningQuizComponent } from "./learning-quiz/learning-quiz.component";
import { InteractiveStoryComponent } from "./interactive-story/interactive-story.component";
import { ExtraInfoComponent } from './extra-info/extra-info.component';
import { HelpSiteComponent } from './help-site/help-site.component';
import { AlertSiteComponent } from './alert-site/alert-site.component';

export const routes: Routes = [
  { path: '', redirectTo: 'start-page', pathMatch: 'full' },
  { path: 'start-page', pathMatch: 'full', component: StartPageComponent },
  { path: 'self-check', pathMatch: 'full', component: SelfcheckComponent },
  { path: 'learning-quiz', pathMatch: 'full', component: LearningQuizComponent },
  { path: 'interactive-story', pathMatch: 'full', component: InteractiveStoryComponent },
  { path: 'extra-info', pathMatch: 'full', component: ExtraInfoComponent },
  { path: 'help-site', pathMatch: 'full', component: HelpSiteComponent },
  { path: 'alert-site', pathMatch: 'full', component: AlertSiteComponent }
];
