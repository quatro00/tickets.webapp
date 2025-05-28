import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  service:string = 'administrador/ticket';


  constructor(private http:HttpClient) { }

  Crear(request:any):Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/${this.service}`,request);
  }



}