import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IChessPreview, IChessRoute} from "../interfaces/IChessPreview";
import {CalculateRouteService} from "../service/calculate-route.service";
import {MessageService} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";
import {ICalculateRouteResponse} from "../interfaces/ICalculateRouteResponse";
import {IRoutePathResponse} from "../interfaces/IRoutePathResponse";

@Component({
  selector: 'app-calculate-route',
  templateUrl: './calculate-route.component.html',
  styleUrls: ['./calculate-route.component.scss']
})
export class CalculateRouteComponent implements OnInit {

  form!: FormGroup;
  chessPreview: IChessPreview[] = [];
  chessRoute: IChessRoute[] = [];
  routes: ICalculateRouteResponse[] = [];
  displayModalRoute: boolean = false;
  selectedRoute: ICalculateRouteResponse | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private calculateRouteService: CalculateRouteService,
    private translateService: TranslateService,
    private messageService: MessageService
  ) {
    this.buildForm();
  }

  async ngOnInit() {
    this.buildChessPreview();
    await this.GetAllRoutes();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      origin: ['', Validators.required],
      packageCollection: ['', Validators.required],
      destination: ['', Validators.required],
    });
  }

  async GetAllRoutes() {
    const {success, data} = await this.calculateRouteService.GetAll();
    if (success) {
      this.routes = data || [];
    }
  }

  blurChessCoordinates(controlName: string) {
    const value = this.form.get(controlName)?.value?.toUpperCase();
    if (this.validateChessCoordinates(value)) {
      this.form.get(controlName)?.setValue(value);
      this.activeChessPreview();
    } else {
      this.form.get(controlName)?.setValue('');
    }
  }

  validateChessCoordinates(value: string) {
    const regex = /^[A-H][1-8]$/;
    return regex.test(value);
  }

  activeChessPreview() {
    const origin = this.form.get('origin')?.value;
    const destination = this.form.get('destination')?.value;
    const packageCollection = this.form.get('packageCollection')?.value;

    this.chessPreview = this.chessPreview.map(column => ({
      ...column,
      columns: column.columns.map(row => ({
        ...row,
        active: row.name === origin || row.name === destination || row.name === packageCollection
      }))
    }));
  }

  activeChessRoute(coordinate: string[], isOrigin: boolean = true) {
    coordinate.forEach((coordinate, index) => {
      const findCoordinate = this.chessRoute.find((column) => column.columns.find(row => row.name === coordinate))!;
      setTimeout(() => {
        findCoordinate.columns.find(row => row.name === coordinate)!.origin = isOrigin;
        findCoordinate.columns.find(row => row.name === coordinate)!.destination = !isOrigin;
      }, index * 250);
    });
  }

  clearForm() {
    this.form.get('origin')?.setValue('');
    this.form.get('destination')?.setValue('');
    this.form.get('packageCollection')?.setValue('');
    this.activeChessPreview();
  }

  handleView(route: ICalculateRouteResponse) {
    this.displayModalRoute = true;
    this.selectedRoute = route;
    const {origin, destination} = route?.routePaths || {origin: [], destination: []};
    this.activeChessRoute(origin);
    setTimeout(() => this.activeChessRoute(destination, false), origin.length * 250);

  }

  closeModal() {
    this.displayModalRoute = false;
    this.selectedRoute = undefined;
    this.chessRoute = JSON.parse(JSON.stringify(this.chessPreview));
  }

  showModal() {
  }

  clickChessColumn(columnName: string) {
    const origin = this.form.get('origin')?.value;
    const destination = this.form.get('destination')?.value;
    const packageCollection = this.form.get('packageCollection')?.value;

    if (origin === columnName) {
      this.form.get('origin')?.setValue('');
    }
    if (destination === columnName) {
      this.form.get('destination')?.setValue('');
    }
    if (packageCollection === columnName) {
      this.form.get('packageCollection')?.setValue('');
    }
    if (!origin) {
      this.form.get('origin')?.setValue(columnName);
    } else if (!packageCollection) {
      this.form.get('packageCollection')?.setValue(columnName);
    } else if (!destination) {
      this.form.get('destination')?.setValue(columnName);
    }

    this.activeChessPreview();
  }

  buildChessPreview() {
    const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const rows = ['1', '2', '3', '4', '5', '6', '7', '8'];

    this.chessPreview = columns.map(column => ({
      name: column,
      columns: rows.map(row => ({name: `${column}${row}`, active: false}))
    }));
    this.chessRoute = JSON.parse(JSON.stringify(this.chessPreview));
  }

  async calculateRoute() {
    if (!this.form.valid) {
      this.messageService.add({
        severity: 'warn',
        summary: this.translateService.instant('attention'),
        detail: this.translateService.instant('fieldsRequired')
      });
      return;
    }
    const {success, data} = await this.calculateRouteService.PostRoute(this.form.value);
    if (success) {
      this.messageService.add({
        severity: 'success',
        summary: this.translateService.instant('success'),
        detail: this.translateService.instant('saveSuccess')
      })
      this.routes.push(data!);
      this.handleView(data!);
      this.clearForm();
    }
  }
}
