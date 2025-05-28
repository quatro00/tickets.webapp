import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipoDeTrabajoService{
  service:string = 'administrador/equipotrabajo';


  constructor(private http:HttpClient) { }

  Crear(request:any):Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/${this.service}`,request);
  }

  GetAll(): Observable<any> {
    let params = new HttpParams();
    
    return this.http.get<any>(`${environment.apiUrl}/${this.service}`);
  }

  GetAgentesReponsables(equipoTrabajoId:string): Observable<any> {
    const params = new HttpParams().set('equipoTrabajoId', equipoTrabajoId);
    return this.http.get<any>(`${environment.apiUrl}/${this.service}/GetAgentesResponsables`, {params});
  }

}