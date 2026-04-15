
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModelAccomplissement} from './ModelAccomplissement';
@Injectable({
  providedIn: 'root'
})
export class AccomplissementService {

  private API = 'http://localhost:8085/accomplissements';

  constructor(private http: HttpClient) {}


  getAccomplissements(): Observable<ModelAccomplissement[]> {
    return this.http.get<ModelAccomplissement[]>(this.API);
  }


  addAccomplissement(accom: ModelAccomplissement): Observable<ModelAccomplissement> {
    return this.http.post<ModelAccomplissement>(this.API, accom);
  }


deleteAccomplissement(id: number): Observable<void> {
  console.log('ID à supprimer (avant requête) :', id);
  return this.http.delete<void>(`${this.API}/${id}`);
}

}
