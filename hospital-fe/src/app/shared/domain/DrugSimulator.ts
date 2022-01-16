import { Observable } from 'rxjs'
import { Drug } from './Drug'
import { PatientsRegister } from './PatientsRegister'
import { SimulationRegister } from './SimulationRegister'

export abstract class DrugSimulator {
  abstract simulate(currentState: PatientsRegister, drugs: Drug[]): Observable<SimulationRegister>
  abstract getHistory(): Observable<SimulationRegister[]>
}
