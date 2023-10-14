import {Component} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {LoadingService} from "../../shared/services/loading.service";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {MenuItem, PrimeNGConfig} from "primeng/api";
import {TranslateChangeService} from "../../shared/services/translate-change.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent {

  loading!: boolean;
  isLogged!: boolean;
  fullscreen = false;
  hideSidenav = false;
  currentLanguage: string | undefined;
  name: string | undefined;
  $destroy = new Subject();

  constructor(
    private authService: AuthService,
    private loadingSrv: LoadingService,
    private config: PrimeNGConfig,
    private translateSrv: TranslateService,
    private translateChangeSrv: TranslateChangeService,
    private router: Router
  ) {
    this.loadingSrv.get().subscribe((load: boolean) => {
      this.loading = load
    });
    this.getName();
    this.isAuthenticated().then();
    this.translateSrv.get('primeng').subscribe(res => this.config.setTranslation(res))
    this.translateSrv.onDefaultLangChange
      .pipe(takeUntil(this.$destroy))
      .subscribe(lang => {
        this.currentLanguage = lang.lang;
      });
  }

  getName() {
    const userDefault = JSON.parse(localStorage.getItem('@AteliwareTest/user') || '{}');
    this.name = userDefault?.name;
  }

  async isAuthenticated() {
    this.isLogged = this.authService.isLogged();
    if (!this.isLogged) {
      this.authService.signOut();
      await this.router.navigate(['/auth']);
    }
  }

  toggleFullscreen() {
    const doc = window.document;
    const docEl = doc.documentElement;
    const requestFullScreen = docEl.requestFullscreen;
    const exitFullScreen = doc.exitFullscreen;

    if (!this.fullscreen) {
      if (requestFullScreen) {
        requestFullScreen.call(docEl);
      }
      this.fullscreen = true;
    } else {
      if (exitFullScreen) {
        exitFullScreen.call(doc);
      }
      this.fullscreen = false;
    }
  }

  changeLanguage(language: 'pt-BR' | 'en-US') {
    this.translateChangeSrv.changeLangDefault(language);
  }

}
