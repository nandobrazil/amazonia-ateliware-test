import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CalculateRouteComponent} from "./calculate-route/calculate-route.component";

const routes: Routes = [
  {
    path: '',
    component: CalculateRouteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalculateRouteRoutingModule { }
