import { Drug } from '../../shared/domain/drugs/Drug'
import { PatientsRegister } from '../../shared/domain/patients/PatientsRegister'

export type SimulationRegister = {
  id: string
  date: Date
  patients: PatientsRegister
  drugs: Drug[]
  results: PatientsRegister
}
