import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Currency } from './models/currency';
import { CurrenciesService } from './services/currencies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loading = false
  currencies$: Observable<Currency[]>
  UAH = {
    r030: 0,
    txt: "Українська гривня",
    rate: 1,
    cc: "UAH",
    exchangedate: new Date().toString()
  }

  constructor(private currenciesService: CurrenciesService) {}

  ngOnInit(): void {
    this.loading = true
    this.currencies$ = this.currenciesService
      .getAll()
      .pipe(tap(() => this.loading = false))
  }

  addUAH(array: Currency[]) {
    return [this.UAH, ...array].sort((a, b) => a.txt.localeCompare(b.txt))
  }
}
