import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalculateRouteRoutingModule } from './calculate-route-routing.module';
import { CalculateRouteComponent } from './calculate-route/calculate-route.component';
import {CoreModule} from "../../core/core.module";


@NgModule({
  declarations: [
    CalculateRouteComponent
  ],
	imports: [
		CommonModule,
		CalculateRouteRoutingModule,
		CoreModule
	]
})
export class CalculateRouteModule { }
