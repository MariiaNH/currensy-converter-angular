import { Component, Input } from '@angular/core';
import { Currency } from 'src/app/models/currency';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  @Input()
  currencies: Currency[]

  public baseValue = 0;
  public quotedValue= 0;
  public baseCourse = 1;
  public quotedCourse = 1;

  enteringBaseValue(event: any) {
    this.baseValue = event.target.value;
    this.quotedValue = +(event.target.value * (this.baseCourse / this.quotedCourse)).toFixed(2)
  }

  enteringQuotedValue(event: any) {
    this.quotedValue = event.target.value;
    this.baseValue = +(event.target.value * (this.quotedCourse / this.baseCourse)).toFixed(2)
  }

  selectingBaseCurrency(event: any) {
    this.currencies.map(currency => {
      if (event.target.value === currency.txt) {
        this.baseCourse = currency.rate;
        this.baseValue = +(this.quotedValue * (currency.rate / this.quotedCourse)).toFixed(2)
      }
    })
  }

  selectingQuotedCurrency(event: any) {
    this.currencies.map(currency=> {
      if (event.target.value === currency.txt) {
        this.quotedCourse = currency.rate;
        this.quotedValue = +(this.baseValue * (this.baseCourse / currency.rate)).toFixed(2)
      }
    })
  }

}
