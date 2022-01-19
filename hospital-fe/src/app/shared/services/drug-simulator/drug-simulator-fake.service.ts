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

  private nextResult?: SimulationRegister

  simulate(patients: PatientsRegister, drugs: Drug[]) {
    const result =
      this.nextResult ?? SimulationRegister.create({ patients, drugs, results: patients })

    this.history$$.next(
      [result, ...this.history$$.getValue()].slice(0, DrugSimulator.HISTORY_MAX_LENGTH)
    )

    return result
  }

  getHistory() {
    return this.history$$
  }

  cleanHistory() {
    this.history$$.next([])
  }

  getRegisters() {
    return this.history$$.getValue()
  }

  setNextSimulationResult(result: SimulationRegister) {
    this.nextResult = result
  }
}
