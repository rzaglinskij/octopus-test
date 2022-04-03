import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { catchError } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';

@Injectable({
    providedIn: "root",
})
export class CurrencyService {

    private subject = new Subject();

    constructor(private http: HttpClient) { }

    getJsonCatchError(code: string): Observable<any> {
        return this.http.get<any>("./assets/data/" + code.toLowerCase() + ".json")
            .pipe(
                catchError((err) => {
                    return throwError(err);
                })
            )
    }

    errorHandler(error: HttpErrorResponse) {
        console.log('error caught from service handler', error);
        return throwError(error.message || 'server Error');
    }

    setCurrency(data: any) {
        this.subject.next(data);
    }

    getCurrency(): Observable<any> {
        return this.subject.asObservable();
    }

}
