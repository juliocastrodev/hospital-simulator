import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Drug } from '../../domain/Drug'
import { DrugSimulator } from '../../domain/DrugSimulator'
import { PatientsRegister } from '../../domain/PatientsRegister'
import { SimulationRegister } from '../../domain/SimulationRegister'
import { Quarantine, Drug as LibDrug } from 'hospital-lib'

@Injectable()
export class DrugSimulatorRealService implements DrugSimulator {
  private history$$ = new BehaviorSubject<SimulationRegister[]>([])

  simulate(patients: PatientsRegister, drugs: Drug[]) {
    const register = this.simulateQuarantine(patients, drugs)

    this.history$$.next(
      [register, ...this.history$$.getValue()].slice(0, DrugSimulator.HISTORY_MAX_LENGTH)
    )

    return register
  }

  getHistory() {
    return this.history$$
  }

  private simulateQuarantine(patients: PatientsRegister, drugs: Drug[]) {
    const simulator = new Quarantine(patients)

    simulator.setDrugs(drugs as LibDrug[])
    simulator.wait40Days()

    return SimulationRegister.create({
      patients,
      drugs,
      results: simulator.report(),
    })
  }
}
