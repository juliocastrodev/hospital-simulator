import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { environment } from '../../../../environments/environment'
import { PatientRepository } from '../../domain/patients/PatientRepository'
import { PatientsRegister } from '../../domain/patients/PatientsRegister'
import { PatientState } from '../../domain/patients/PatientState'

// The number of patient states is indeterminate and there may be repeated states
type PatientsRegisterResponse = `${PatientState},${PatientState}`

@Injectable()
export class PatientRepositoryApiService implements PatientRepository {
  private patientsRegister$$ = new BehaviorSubject<PatientsRegister>({})

  constructor(private readonly http: HttpClient) {}

  fetchPatientsRegister() {
    const { baseUrl } = environment

    return this.http.get<PatientsRegisterResponse>(`${baseUrl}/patients`).pipe(
      map((response) => {
        const patientsRegister: PatientsRegister = {}

        response
          .split(',')
          .forEach(
            (patientState) =>
              (patientsRegister[patientState] = 1 + (patientsRegister[patientState] ?? 0))
          )

        return patientsRegister
      }),
      tap((patientsRegister) => this.patientsRegister$$.next(patientsRegister))
    )
  }

  getPatientsRegister() {
    return this.patientsRegister$$
  }
}
