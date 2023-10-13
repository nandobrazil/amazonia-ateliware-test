import { Component } from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";

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
    private formBuilder: FormBuilder
  ) {
    this.isAuthenticated().then();

    this.buildForm();
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
