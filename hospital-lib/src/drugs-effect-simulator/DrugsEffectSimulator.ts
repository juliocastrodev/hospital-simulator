import { Drug } from '../shared/Drug'
import { PatientState } from '../shared/PatientState'

export interface DrugsEffectsSimulator {
  simulate(patientState: PatientState, drugsToProvide: Drug[]): PatientState
}
