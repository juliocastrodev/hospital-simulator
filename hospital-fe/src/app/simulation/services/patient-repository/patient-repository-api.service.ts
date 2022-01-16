import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { map, share, switchMap } from 'rxjs/operators'
import { environment } from '../../../../environments/environment'
import { PatientsRegister } from '../../../shared/domain/PatientsRegister'
import { PatientState } from '../../../shared/domain/PatientState'
import { PatientRepository } from '../../domain/PatientRepository'

// The number of patient states is indeterminate and there may be repeated states
type PatientsRegisterResponse = `${PatientState},${PatientState}` | ''

@Injectable()
export class PatientRepositoryApiService implements PatientRepository {
  constructor(private readonly http: HttpClient) {}

  private triggerFetchPatientsRegister$$ = new BehaviorSubject<void>(undefined)

  private fetchPatientsRegister$ = this.triggerFetchPatientsRegister$$.pipe(
    switchMap(() => this.http.get<PatientsRegisterResponse>(`${environment.baseUrl}/patients`)),
    map((response) => {
      if (response === '') return {}

      const patientsRegister: PatientsRegister = {}

      response
        .split(',')
        .forEach(
          (patientState) =>
            (patientsRegister[patientState] = 1 + (patientsRegister[patientState] ?? 0))
        )

      return patientsRegister
    }),
    share()
  )

  fetchPatientsRegister() {
    this.triggerFetchPatientsRegister$$.next()
  }

  getPatientsRegister() {
    return this.fetchPatientsRegister$
  }
}
