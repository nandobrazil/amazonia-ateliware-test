import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import {LayoutModule} from "../layout.module";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {CoreModule} from "../../core/core.module";


@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,

    PagesRoutingModule,
    ToastModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
    CoreModule,
    NgOptimizedImage,
  ],
  providers: [MessageService],
})
export class PagesModule { }
