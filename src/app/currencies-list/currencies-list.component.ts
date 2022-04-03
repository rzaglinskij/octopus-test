import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CurrenciesService } from '../@core/services/currencies.service';

import { tap, first } from "rxjs/operators";
import { CurrencyInterface } from '../@core/interfaces/currency.interface';
import { CurrenciesInterface } from '../@core/interfaces/currencies.interface';
import { CurrencyService } from '../@core/services/currency.service';

@Component({
  selector: 'app-currencies-list',
  templateUrl: './currencies-list.component.html',
  styleUrls: ['./currencies-list.component.scss'],
})
export class CurrenciesListComponent implements OnInit {

  searchCurrency = '';
  currencyList: CurrencyInterface[] = [];

  errorMessage: string = '';

  constructor(
    private _currenciesService: CurrenciesService,
    private _currencyService: CurrencyService,
  ) { }

  ngOnInit() {
    this._currenciesService.getJson().pipe(
      first(),
      tap((data: CurrenciesInterface) => {
        this.currencyList = data.currencies.sort((a, b) => a.country > b.country ? 1 : -1); //sort by country
      })
    ).subscribe();
  }

  getDetails(item: CurrencyInterface) {
    this._currencyService.getJsonCatchError(item.code).pipe(
      first(),
      tap((data) => {
        this._currencyService.setCurrency({ currency: item, data: data });
      }, (error) => {
        this.errorMessage = error;

      }),
    ).subscribe();
  }

}
