import { Observable } from 'rxjs'
import { Drug } from './Drug'
import { PatientsRegister } from './PatientsRegister'
import { SimulationRegister } from './SimulationRegister'

export abstract class DrugSimulator {
  static readonly HISTORY_MAX_LENGTH = 10

  abstract simulate(currentState: PatientsRegister, drugs: Drug[]): SimulationRegister
  abstract getHistory(): Observable<SimulationRegister[]>
}
