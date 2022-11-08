import { Component, Input } from '@angular/core';
import { Currency } from 'src/app/models/currency';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() currencies: Currency[]

  euro = 0
  dollar = 0

  ngOnChanges() {
    if(this.currencies) {
      this.currencies.forEach(currency => {
        if(currency.cc === "USD") {
          this.dollar = currency.rate
        }

        if (currency.cc === "EUR") {
          this.euro = currency.rate
        }
      })
    }
  }
}
