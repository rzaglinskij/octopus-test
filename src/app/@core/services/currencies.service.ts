import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CurrenciesInterface } from "../interfaces/currencies.interface";

const file = 'currencies.json';

@Injectable({
    providedIn: "root",
})
export class CurrenciesService {
    constructor(private http: HttpClient) { }

    getJson(): Observable<CurrenciesInterface> {
        return this.http.get<CurrenciesInterface>("./assets/data/" + file);
    }

}
