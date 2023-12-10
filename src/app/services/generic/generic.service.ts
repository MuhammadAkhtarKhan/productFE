import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };
  constructor(private http: HttpClient) {}

  //for getting all records
  getAll(baseUrl: string): Observable<any> {
    return this.http.get(baseUrl)
    .pipe(catchError(this.errorHandling));
  }
  //for getting all records
  getById(baseUrl: string, id:number): Observable<any> {
    return this.http.get(baseUrl+'?id='+ id)
    .pipe(catchError(this.errorHandling));
  }
  //for searching records
  delete(baseUrl: string, id: number): Observable<any> {
    return this.http.delete(baseUrl+'?id='+ id,{...this.httpOptions, responseType: 'text' })
    .pipe(catchError(this.errorHandling));
  }

  //for updating record
  update(baseUrl: string, entity: any): Observable<string> {
    return this.http.put(baseUrl, JSON.stringify(entity),{...this.httpOptions, responseType: 'text' })
    .pipe(catchError(this.errorHandling));
  }
//for inserting data
  insert(baseUrl: string, entity: any): Observable<string> {
    return this.http.post(baseUrl, JSON.stringify(entity), {...this.httpOptions, responseType: 'text' })
    .pipe(catchError(this.errorHandling));
  }
  errorHandling(error:any){
let errorMessage="";
if(error.error instanceof ErrorEvent){
  // get client side error
  errorMessage=error.error.message;
}else{
// get server side error
errorMessage=`Error Code: ${error.status}\n Message: ${error.message}`;
}
console.warn(errorMessage);
return throwError (errorMessage)
  }
}
