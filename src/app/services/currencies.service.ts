import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Currency } from '../models/currency';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {
  URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {

  }

  getAll(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.URL)
      .pipe(
        retry(2),
        catchError(this.errorHandler.bind(this))
      )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}
