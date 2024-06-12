import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Sale} from "../../shared/sale";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {


  private http!: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  private baseUrl = "http://localhost:8080/api/v1/sale";

  getAll():Observable<Sale[]>{
    return this.http.get<Sale[]>(this.baseUrl)
  }

  save(dado:Sale):Observable<any[]>{
    return this.http.post<Sale[]>(this.baseUrl,dado)
  }

  update(dado:Sale, id:number):Observable<any[]>{
    return this.http.put<Sale[]>(this.baseUrl+"/"+id,dado)
  }

  delete( id:number):Observable<any[]>{
    return this.http.delete<Sale[]>(this.baseUrl+"/"+id)
  }
}
