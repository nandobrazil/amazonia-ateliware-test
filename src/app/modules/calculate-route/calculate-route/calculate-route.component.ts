import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IChessPreview} from "../interfaces/IChessPreview";

@Component({
  selector: 'app-calculate-route',
  templateUrl: './calculate-route.component.html',
  styleUrls: ['./calculate-route.component.scss']
})
export class CalculateRouteComponent {

  form!: FormGroup;
  chessPreview: IChessPreview[] = [];

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
    this.buildChessPreview();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      origin: ['', Validators.required],
      package_collection: ['', Validators.required],
      destination: ['', Validators.required],
    });
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
    const package_collection = this.form.get('package_collection')?.value;

    this.chessPreview = this.chessPreview.map(column => ({
      ...column,
      columns: column.columns.map(row => ({
        ...row,
        active: row.name === origin || row.name === destination || row.name === package_collection
      }))
    }));
  }

  clickChessColumn(columnName: string) {
    const origin = this.form.get('origin')?.value;
    const destination = this.form.get('destination')?.value;
    const package_collection = this.form.get('package_collection')?.value;
    if (origin === columnName) {
      this.form.get('origin')?.setValue('');
    }
    if (destination === columnName) {
      this.form.get('destination')?.setValue('');
    }
    if (package_collection === columnName) {
      this.form.get('package_collection')?.setValue('');
    }
    if (!origin) {
      this.form.get('origin')?.setValue(columnName);
    } else if (!package_collection) {
      this.form.get('package_collection')?.setValue(columnName);
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
  }

  calculateRoute() {

  }
}
