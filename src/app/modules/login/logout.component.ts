import {Component} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {LoadingService} from "../../shared/services/loading.service";

@Component({
  template: '',
  selector: 'app-logout',
})
export class LogoutComponent {
  constructor(private authService: AuthService, private router: Router, private loadingService: LoadingService) {
    this.authService.signOut();
    this.loadingService.next(true);
    this.loadingService.next(false);
    window.location.reload();
  }
}
