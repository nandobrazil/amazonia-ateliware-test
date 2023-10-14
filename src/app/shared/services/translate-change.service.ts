import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import {StorageKeys} from "../constants/storage-key";

@Injectable({
  providedIn: 'root'
})
export class TranslateChangeService {

  private supportedLangs = [ 'pt-BR', 'en-US' ];

  constructor(
    private translate: TranslateService,
    private config: PrimeNGConfig,
  ) {
    this.translate.get('primeng').subscribe(res => this.config.setTranslation(res));
  }


  changeLangDefault(lang: 'pt-BR' | 'en-US') {
    console.log('entrei')
    if (!this.supportedLangs.includes(lang)) {
      lang = 'en-US';
    }
    localStorage.setItem(StorageKeys.defaultLanguage, lang);
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    this.translate.get('primeng').subscribe(res => this.config.setTranslation(res));
  }

}
