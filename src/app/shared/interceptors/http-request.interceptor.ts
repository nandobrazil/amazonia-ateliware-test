import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import {from, Observable, of, switchMap} from 'rxjs';
import {catchError, finalize, map} from 'rxjs/operators';
import {MessageService} from 'primeng/api';

import {Router} from '@angular/router';
import {LoadingService} from "../services/loading.service";
import {AuthService} from "../services/auth.service";
import {environment} from "../../../environments/environment";
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  isRefreshingToken = false;
  environment = environment;
  private requestCount = 0;

  constructor(
    private messageService: MessageService,
    private loadingService: LoadingService,
    private translateService: TranslateService,
    private authService: AuthService,
    private route: Router
  ) {
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ) {
    this.requestCount++;
    const accessToken = this.authService.getAccessToken();
    const headers = new HttpHeaders(accessToken ? {Authorization: `Bearer ${accessToken}`} : {});
    req = req.clone({headers});
    this.loadingService.next(true);
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && req.url.startsWith(this.environment.apiUrl)) {
          const body = event.body;
          return event.clone({
            body: {
              success: true,
              data: body?.data === undefined ? body : body?.data,
              message: body?.message || body?.error || ''
            }
          });
        }
        return event;
      }),
      catchError((error: HttpErrorResponse, restart) =>   {
        this.messageService.clear();
        this.loadingService.next(false);
        const message = error?.error?.message || error?.error?.erro || error?.message || this.translateService.instant('messages.error.generic');
        if ([422, 404, 400].includes(error.status)) {
          this.messageService.add({
            summary: this.translateService.instant('error'),
            severity: 'warn',
            detail: this.translateService.instant(message)
          });
        } else if ([401, 403].includes(error.status)) {
          const message = error?.error?.message || error?.error?.erro || error?.message || 'messages.error.unauthorized';
          this.messageService.add({
            summary: this.translateService.instant('error'),
            severity: 'warn',
            detail: this.translateService.instant(message)
          });
          this.route.navigate(['/auth/login']);
        } else if (error.status === 409) {
          const message = error?.error?.message || error?.error?.erro || error?.message || 'messages.error.generic';
          this.messageService.add({
            summary: this.translateService.instant('error'),
            severity: 'warn',
            detail: this.translateService.instant(message)
          });
        } else if (error.status === 500) {
          this.messageService.add({
            summary: this.translateService.instant('error'),
            severity: 'warn',
            detail: this.translateService.instant(message)
          });
        }
        return of(new HttpResponse({
          body: {
            success: false,
            data: error?.error,
            message: error?.error?.error || error?.message,
          }
        }));
      }),
      finalize(() => {
        this.requestCount--;
        if (this.requestCount === 0) this.loadingService.next(false);
      }),
    );
  }
}
