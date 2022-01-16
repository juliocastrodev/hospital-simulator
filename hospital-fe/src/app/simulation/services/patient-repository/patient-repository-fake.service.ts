import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { PatientsRegister } from '../../../shared/domain/PatientsRegister'
import { PATIENTS_REGISTER } from '../../../utils/fixtures/patients'
import { PatientRepository } from '../../domain/PatientRepository'

@Injectable()
export class PatientRepositoryFakeService implements PatientRepository {
  private patientsRegister$$ = new BehaviorSubject<PatientsRegister>(PATIENTS_REGISTER)

  fetchPatientsRegister() {
    this.patientsRegister$$.next({ ...this.patientsRegister$$.getValue() })
  }

  getPatientsRegister(): Observable<PatientsRegister> {
    return this.patientsRegister$$
  }
}
