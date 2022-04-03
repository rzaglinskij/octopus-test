import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'currencyFilter',
    pure: false,
})

export class CurrencyFilterPipe implements PipeTransform {
    transform(currencyList, searchStr: string, arg1: string = '', arg2: string = '') {
        if (currencyList.length === 0 || searchStr === '') {
            return currencyList;
        }
        return currencyList.filter((item) => (item[arg1] + item[arg2]).toLowerCase().indexOf(searchStr.toLowerCase()) !== -1);
    }
}
