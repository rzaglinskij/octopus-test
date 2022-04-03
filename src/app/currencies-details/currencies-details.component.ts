import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrencyService } from '../@core/services/currency.service';

@Component({
  selector: 'app-currencies-details',
  templateUrl: './currencies-details.component.html',
  styleUrls: ['./currencies-details.component.scss']
})
export class CurrenciesDetailsComponent implements OnInit, OnDestroy {

  currency: any = {};
  currencySubscription: Subscription;

  chartData = {};

  constructor(
    private _currencyService: CurrencyService,
  ) { }

  ngOnInit() {
    this.currencySubscription = this._currencyService.getCurrency().subscribe((data) => {
      this.currency = data;
      this.chartData = data.data.rates.map((item, idx) => [idx, item]);
    });
  }

  getAverage(list) {
    let sum = list.reduce((a, b) => a + b, 0);
    return (sum / list.length) || 0;
  }

  ngOnDestroy(): void {
    this.currencySubscription.unsubscribe();
  }

}
