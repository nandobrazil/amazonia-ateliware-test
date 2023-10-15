import {Component} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {TranslateChangeService} from "../../../shared/services/translate-change.service";
import {StorageKeys} from "../../../shared/constants/storage-key";
import {debounceTime} from "rxjs";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formLogin!: FormGroup;
  formSignup!: FormGroup;
  signUp: boolean = false;

  constructor(
    private authSrv: AuthService,
    private messageService: MessageService,
    private router: Router,
    private translateService: TranslateService,
    private translateChangeService: TranslateChangeService,
    private formBuilder: FormBuilder
  ) {
    this.isAuthenticated().then();
    this.setLanguage();
    this.buildForm();
  }

  setLanguage() {
    const lang = localStorage.getItem(StorageKeys.defaultLanguage);
    if (!lang)
      this.translateChangeService.changeLangDefault('pt-BR');
  }

  async isAuthenticated() {
    if (this.authSrv.isLogged()) {
      this.router.navigate(['/routes']).then(() => window.location.reload());
    }
  }

  buildForm() {
    this.formLogin = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.formSignup = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });

    const {confirmPassword, password} = this.formSignup.controls;
    password.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) => {
        if (!confirmPassword?.touched) return;
        if (value !== confirmPassword?.value) {
          confirmPassword.setErrors({notMatch: true});
        } else {
          confirmPassword.setErrors(null);
        }
      });
    confirmPassword.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) => {
        if (value !== password?.value) {
          confirmPassword.setErrors({notMatch: true});
        } else {
          confirmPassword.setErrors(null);
        }
      });
  }

  async signIn() {
    this.formLogin.markAsTouched();
    if (!this.formLogin.valid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: this.translateService.instant('invalidFormLogin')
      });
      return;
    }
    const success = await this.authSrv.signIn(this.formLogin.value);
    if (success) {
      window.location.reload();
    }
  }

  async register() {
    this.formSignup.markAsTouched();
    if (!this.formSignup.valid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: this.translateService.instant('invalidFormLogin')
      });
      return;
    }
    const sender = { ...this.formSignup.value };
    delete sender.confirmPassword;
    const {success, data} = await this.authSrv.signUp(sender);
    if (success) {
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: this.translateService.instant('registerSuccess')
      });
      this.signUp = false;
      this.formLogin.patchValue({
        username: data?.username,
        password: this.formSignup.get('password')?.value
      });
      this.formSignup.reset();
      await this.signIn();
    }
  }

}
