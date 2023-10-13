import {Component} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {LoadingService} from "../../shared/services/loading.service";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {PrimeNGConfig} from "primeng/api";

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent {

  loading!: boolean;
  isLogged!: boolean;
  hideSidenav = false;
  constructor(
    private authService: AuthService,
    private loadingSrv: LoadingService,
    private config: PrimeNGConfig,
    private translateSrv: TranslateService,
    private router: Router
  ) {
    this.loadingSrv.get().subscribe((load: boolean) => {
      this.loading = load
    });
    this.isAuthenticated().then();
    this.translateSrv.get('primeng').subscribe(res => this.config.setTranslation(res))
  }

  async isAuthenticated() {
    this.isLogged = this.authService.isLogged();
    if (!this.isLogged) {
      this.authService.signOut();
      await this.router.navigate(['/auth']);
    }
  }

}