import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private _httpClient: HttpClient) { }
  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
    } else {
      console.error('Server Side Error :', errorResponse);
    }
    // return an observable with a meaningful error message to the end user
    return  throwError('There is a problem with the service.We are notified & working on it.Please try again later.');
  }
  test(){
    return 'test success';
  }
  fetchValues() : Observable<any>{
    return this._httpClient.get<any>('/api/values/current', {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }).pipe(catchError(this.handleError));
  }

  fetchIndexes() : Observable<any>{
    return this._httpClient.get<any>('/api/values/all', {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }).pipe(catchError(this.handleError));
  }
  saveIndex(index: number) : Observable<any> {
    return this._httpClient.post<any>('/api/values', index, {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }).pipe(catchError(this.handleError));
  }
}
