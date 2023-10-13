import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../services/auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  async canActivate() {
    const authenticated = this.authService.isLogged();
    if (!authenticated) {
      await this.router.navigate(['/auth']);
    }
    return authenticated;
  }
}
