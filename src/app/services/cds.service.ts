import { Injectable } from '@angular/core';
import { CD } from '../models/cd.model';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CdsService {

  constructor(private http: HttpClient) { }

  getAllCDs(): Observable<CD[]> {
    return this.http.get<CD[]>("http://localhost:3000/CD");
  }

  getCDById(id: number): Observable<CD> {
    return this.http.get<CD>("http://localhost:3000/CD/" + id);
  }

  addCD(newCD: CD): Observable<CD> {
    return this.getAllCDs().pipe(
      switchMap(cds => {
        let maxId = 0;
        cds.forEach(cd => { maxId = (cd.id > maxId ? cd.id : maxId); });
        newCD.id = maxId + 1;
        return this.http.post<CD>('http://localhost:3000/CD', newCD);
      }
      ));
  }
}
