import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Carrera } from '../models/carrera';
import {Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {


  url : string = "https://localhost:44348/api/Carrera";

  httpOptions={
    headers:new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'      
    })
  };

  constructor(private http:HttpClient) { }

  save(a:Carrera) : Observable<any> {
    let alumnoBody = JSON.stringify(a);    
    if(a.idcarrera === undefined){      
      return this.http.post<any>(this.url, alumnoBody, this.httpOptions);
    }
    return this.http.put<any>(this.url, alumnoBody, this.httpOptions);
  }

  retrieve(id:number): Observable<Carrera> {
    return this.http.get<Carrera>(this.url + "/" + id, this.httpOptions)
      .pipe(
        retry(1)
      );
  } 

  delete(a: Carrera) : Observable<any> {
    return this.http.delete<any>(this.url + '/' + a.idcarrera, 
      this.httpOptions);
  }

  list(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(this.url, this.httpOptions)
      .pipe(
        retry(1)
      );
  } 
}
