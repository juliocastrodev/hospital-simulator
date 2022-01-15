import { Drug } from '../../shared/domain/Drug'
import { PatientsRegister } from '../../shared/domain/PatientsRegister'

export type SimulationRegister = {
  id: string
  date: Date
  patients: PatientsRegister
  drugs: Drug[]
  results: PatientsRegister
}
