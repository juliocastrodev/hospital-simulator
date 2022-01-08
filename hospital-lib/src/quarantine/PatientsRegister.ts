import { PatientState } from '../shared/PatientState'

export type PatientsRegister = {
  [key in PatientState]?: number
}
