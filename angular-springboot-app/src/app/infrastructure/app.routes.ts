import { Routes } from '@angular/router';
import { Login } from '../presentation-UI/components/login/login';
import { AccueilParents } from '../components/accueil-parents/accueil-parents';
import { ClassGroupPage } from '../components/class-group-page/class-group-page';
import { Evaluations } from '../components/evaluations/evaluations';
import { Bulletin } from '../components/bulletin/bulletin';
import { roleGuard } from '../business-logic/guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  
  // Routes protégées LEGAL_GUARDIAN
  { 
    path: 'accueil-parent', 
    component: AccueilParents,
    canActivate: [roleGuard(['LEGAL_GUARDIAN'])]
  },
  { 
    path: 'classes/:studentId', 
    component: ClassGroupPage,
    canActivate: [roleGuard(['LEGAL_GUARDIAN'])]
  },
  { 
    path: 'evaluations/:studentId', 
    component: Evaluations,
    canActivate: [roleGuard(['LEGAL_GUARDIAN'])]
  },
  { 
    path: 'bulletin/:studentId', 
    component: Bulletin,
    canActivate: [roleGuard(['LEGAL_GUARDIAN'])]
  },
  
  { path: '**', redirectTo: '/login' }
];