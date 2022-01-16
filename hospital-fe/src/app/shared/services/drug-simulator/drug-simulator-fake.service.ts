import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { SIMULATIONS } from '../../../utils/fixtures/simulations'
import { Drug } from '../../domain/Drug'
import { DrugSimulator } from '../../domain/DrugSimulator'
import { PatientsRegister } from '../../domain/PatientsRegister'
import { SimulationRegister } from '../../domain/SimulationRegister'

@Injectable()
export class DrugSimulatorFakeService implements DrugSimulator {
  private history$$ = new BehaviorSubject<SimulationRegister[]>(SIMULATIONS)

  simulate(patients: PatientsRegister, drugs: Drug[]) {
    const register = SimulationRegister.create({ patients, drugs, results: patients })

    this.history$$.next([register, ...this.history$$.getValue()])

    return register
  }

  getHistory() {
    return this.history$$
  }
}
