import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RouteGuardService } from './service/route-guard.service';
import { FullComponent } from './layouts/full/full.component';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  {
    path: 'cafe',
    component: FullComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [RouteGuardService],
        data: {
          expectedRole: ['admin', 'user']
        }
      }
    ]
  },
  { path: '**', component: HomepageComponent },

];
