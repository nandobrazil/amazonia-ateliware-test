import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalculateRouteRoutingModule } from './calculate-route-routing.module';
import { CalculateRouteComponent } from './calculate-route/calculate-route.component';


@NgModule({
  declarations: [
    CalculateRouteComponent
  ],
  imports: [
    CommonModule,
    CalculateRouteRoutingModule
  ]
})
export class CalculateRouteModule { }
