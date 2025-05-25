import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  service: string = 'administrador/area';


  constructor(private http: HttpClient) { }

  Crear(request: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/${this.service}`, request);
  }

  CrearSubArea(request: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/${this.service}/CrearSubArea`, request);
  }

  AsignarResponsables(request: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/${this.service}/AsignaResponsables`, request);
  }

  GetAll(): Observable<any> {
    let params = new HttpParams();
    
    return this.http.get<any>(`${environment.apiUrl}/${this.service}`);
  }

  GetResponsablesArea(areaId:string): Observable<any> {
    const params = new HttpParams().set('areaId', areaId);
    return this.http.get<any>(`${environment.apiUrl}/${this.service}/GetResponsablesArea`, {params});
  }

  GetArbolAreas(organizacionId:string): Observable<any> {
    const params = new HttpParams().set('organizacionId', organizacionId);
    return this.http.get<any>(`${environment.apiUrl}/${this.service}/GetArbolAreas`, {params});
  }

  GetById(id: any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.service}/${id}`);
  }

  Desactivar(id: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/${this.service}/${id}/desactivar`, {});
  }

  Reactivar(id: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/${this.service}/${id}/activar`, {});
  }
  Update(id: string, request: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/${this.service}/${id}`, request);
  }

}