import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as Loans from '../assets/current-loans.json';

@Injectable({
  providedIn: 'root'
})
export class LoansService {



  constructor() { }

  getLoans(): Observable<any>{
    return of(Loans);
  }
}
