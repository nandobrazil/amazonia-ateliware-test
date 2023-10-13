import {LOCALE_ID, NgModule} from '@angular/core';
import { AvatarModule } from "primeng/avatar";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AccordionModule } from "primeng/accordion";
import { AutoCompleteModule } from "primeng/autocomplete";
import { BadgeModule } from "primeng/badge";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { BlockUIModule } from "primeng/blockui";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { CarouselModule } from "primeng/carousel";
import { CheckboxModule } from "primeng/checkbox";
import { ChipsModule } from "primeng/chips";
import { ChipModule } from "primeng/chip";
import { ContextMenuModule } from "primeng/contextmenu";
import { VirtualScrollerModule } from "primeng/virtualscroller";
import { DataViewModule } from "primeng/dataview";
import { DialogModule } from "primeng/dialog";
import { DividerModule } from "primeng/divider";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DockModule } from "primeng/dock";
import { DropdownModule } from "primeng/dropdown";
import { DynamicDialogModule } from "primeng/dynamicdialog";
import { FieldsetModule } from "primeng/fieldset";
import { FileUploadModule } from "primeng/fileupload";
import { GalleriaModule } from "primeng/galleria";
import { InplaceModule } from "primeng/inplace";
import { InputMaskModule } from "primeng/inputmask";
import { InputSwitchModule } from "primeng/inputswitch";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputNumberModule } from "primeng/inputnumber";
import { ImageModule } from "primeng/image";
import { KnobModule } from "primeng/knob";
import { ListboxModule } from "primeng/listbox";
import { MegaMenuModule } from "primeng/megamenu";
import { MenuModule } from "primeng/menu";
import { MenubarModule } from "primeng/menubar";
import { MessageModule } from "primeng/message";
import { MessagesModule } from "primeng/messages";
import { MultiSelectModule } from "primeng/multiselect";
import { OrganizationChartModule } from "primeng/organizationchart";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { PaginatorModule } from "primeng/paginator";
import { PanelModule } from "primeng/panel";
import { PanelMenuModule } from "primeng/panelmenu";
import { PasswordModule } from "primeng/password";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { ProgressBarModule } from "primeng/progressbar";
import { RadioButtonModule } from "primeng/radiobutton";
import { RatingModule } from "primeng/rating";
import { SelectButtonModule } from "primeng/selectbutton";
import { SidebarModule } from "primeng/sidebar";
import { ScrollerModule } from "primeng/scroller";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { ScrollTopModule } from "primeng/scrolltop";
import { SkeletonModule } from "primeng/skeleton";
import { SlideMenuModule } from "primeng/slidemenu";
import { SliderModule } from "primeng/slider";
import { SpeedDialModule } from "primeng/speeddial";
import { SpinnerModule } from "primeng/spinner";
import { SplitterModule } from "primeng/splitter";
import { SplitButtonModule } from "primeng/splitbutton";
import { StepsModule } from "primeng/steps";
import { TableModule } from "primeng/table";
import { TabMenuModule } from "primeng/tabmenu";
import { TabViewModule } from "primeng/tabview";
import { TagModule } from "primeng/tag";
import { TerminalModule } from "primeng/terminal";
import { TieredMenuModule } from "primeng/tieredmenu";
import { TimelineModule } from "primeng/timeline";
import { ToastModule } from "primeng/toast";
import { ToggleButtonModule } from "primeng/togglebutton";
import { ToolbarModule } from "primeng/toolbar";
import { TooltipModule } from "primeng/tooltip";
import { TriStateCheckboxModule } from "primeng/tristatecheckbox";
import { TreeModule } from "primeng/tree";
import { TreeSelectModule } from "primeng/treeselect";
import { TreeTableModule } from "primeng/treetable";
import { AnimateModule } from "primeng/animate";
import { CardModule } from "primeng/card";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import {TranslateModule} from "@ngx-translate/core";

registerLocaleData(ptBr);

const importExportModules = [
  AvatarModule,
  FormsModule,
  HttpClientModule,
  ReactiveFormsModule,
  AccordionModule,
  AutoCompleteModule,
  BadgeModule,
  BreadcrumbModule,
  BlockUIModule,
  ButtonModule,
  CalendarModule,
  CarouselModule,
  CascadeSelectModule,
  CheckboxModule,
  ChipsModule,
  ChipModule,
  ConfirmDialogModule,
  ConfirmPopupModule,
  ContextMenuModule,
  VirtualScrollerModule,
  DataViewModule,
  DialogModule,
  DividerModule,
  DockModule,
  DropdownModule,
  DynamicDialogModule,
  FieldsetModule,
  FileUploadModule,
  GalleriaModule,
  InplaceModule,
  InputMaskModule,
  InputSwitchModule,
  InputTextModule,
  InputTextareaModule,
  InputNumberModule,
  ImageModule,
  KnobModule,
  ListboxModule,
  MegaMenuModule,
  MenuModule,
  MenubarModule,
  MessageModule,
  MessagesModule,
  MultiSelectModule,
  OrganizationChartModule,
  OverlayPanelModule,
  PaginatorModule,
  PanelModule,
  PanelMenuModule,
  PasswordModule,
  ProgressSpinnerModule,
  ProgressBarModule,
  RadioButtonModule,
  RatingModule,
  SelectButtonModule,
  SidebarModule,
  ScrollerModule,
  ScrollPanelModule,
  ScrollTopModule,
  SkeletonModule,
  SlideMenuModule,
  SliderModule,
  SpeedDialModule,
  SpinnerModule,
  SplitterModule,
  SplitButtonModule,
  StepsModule,
  TableModule,
  TabMenuModule,
  TabViewModule,
  TagModule,
  TerminalModule,
  TieredMenuModule,
  TimelineModule,
  ToastModule,
  ToggleButtonModule,
  ToolbarModule,
  TooltipModule,
  TriStateCheckboxModule,
  TreeModule,
  TreeSelectModule,
  TreeTableModule,
  AnimateModule,
  CardModule,
  TranslateModule
];

@NgModule({
  declarations: [],
  imports: [
    ... importExportModules
  ],
  exports: [
    ... importExportModules
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' }
  ]
})
export class CoreModule { }
