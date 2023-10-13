import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./shared/guards/auth.guard";
import {PagesComponent} from "./layout/pages/pages.component";

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'routes',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/calculate-route/calculate-route.module').then(m => m.CalculateRouteModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
