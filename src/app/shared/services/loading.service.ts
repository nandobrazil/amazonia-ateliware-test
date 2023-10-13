import { Injectable } from '@angular/core';
import { Subject, Observable, asyncScheduler } from 'rxjs';
import { delay, distinctUntilChanged, throttleTime } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LoadingService {

  private loadingSubject: Subject<boolean> = new Subject<boolean>();

  next(isLoading: boolean) {
    this.loadingSubject.next(isLoading);
  }

  get(): Observable<boolean> {
    return this.loadingSubject.pipe(
      throttleTime(0, asyncScheduler, { leading: false, trailing: true }),
      distinctUntilChanged((x, y) => x === y),
      delay(0));
  }
}
