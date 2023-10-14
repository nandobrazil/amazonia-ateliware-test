import { Component } from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {TranslateChangeService} from "../../../shared/services/translate-change.service";
import {StorageKeys} from "../../../shared/constants/storage-key";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formLogin!: FormGroup;
  constructor(
    private authSrv: AuthService,
    private messageService: MessageService,
    private router: Router,
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
  }

  async signIn() {
    this.formLogin.markAsTouched();
    if (!this.formLogin.valid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Digite o usuário e senha para realizar o login.'
      });
      return;
    }
    const success = await this.authSrv.signIn(this.formLogin.value);
    if (success) {
      window.location.reload();
    }
  }

}
