import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Drug } from '../../domain/Drug'
import { DrugSimulator } from '../../domain/DrugSimulator'
import { PatientsRegister } from '../../domain/PatientsRegister'
import { SimulationRegister } from '../../domain/SimulationRegister'

@Injectable()
export class DrugSimulatorRealService implements DrugSimulator {
  private history$$ = new BehaviorSubject<SimulationRegister[]>([])

  simulate(patients: PatientsRegister, drugs: Drug[]): Observable<SimulationRegister> {
    const register = SimulationRegister.create({ patients, drugs, results: patients })

    return of(register).pipe(
      tap(() => {
        const updatedHistory = [register, ...this.history$$.getValue()].slice(0, 10)

        this.history$$.next(updatedHistory)
      })
    )
  }

  getHistory(): Observable<SimulationRegister[]> {
    return this.history$$
  }
}
