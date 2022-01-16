import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { tap } from 'rxjs/operators'
import { PatientRepository } from '../../domain/patients/PatientRepository'
import { PatientsRegister } from '../../domain/patients/PatientsRegister'

@Injectable()
export class PatientRepositoryFakeService implements PatientRepository {
  patientsRegister: PatientsRegister = {
    D: 23,
    F: 100,
    H: 33,
    X: 10,
  }

  private patientsRegister$$ = new BehaviorSubject<PatientsRegister>({})

  fetchPatientsRegister(): Observable<PatientsRegister> {
    return of({ ...this.patientsRegister }).pipe(
      tap((patientsRegister) => this.patientsRegister$$.next(patientsRegister))
    )
  }

  getPatientsRegister(): Observable<PatientsRegister> {
    return this.patientsRegister$$
  }
}
