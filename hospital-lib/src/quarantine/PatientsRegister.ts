import { PatientState } from '../shared/PatientState'

export type PatientsRegister = {
  [key in PatientState]?: number
}

export function patientStatesFrom(patientRegister: PatientsRegister) {
  return Object.keys(patientRegister) as PatientState[]
}
