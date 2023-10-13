import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { BreadcrumbModule } from "primeng/breadcrumb";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {MegaMenuModule} from "primeng/megamenu";
import {MenuComponent} from "./menu/menu.component";
import {CoreModule} from "../core/core.module";
import { WidgetsComponent } from './widgets/widgets.component';



@NgModule({
  declarations: [
    MenuComponent,
    WidgetsComponent,
  ],
  imports: [
    CommonModule,
    BreadcrumbModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    MegaMenuModule,
    CoreModule,
    NgOptimizedImage
  ],
  exports: [
    MenuComponent,
    WidgetsComponent,
  ]
})
export class LayoutModule { }
