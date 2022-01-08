import { Drug } from '../shared/Drug'
import { PatientState } from '../shared/PatientState'

export type DrugsEffectSimulateParams = {
  patientState: PatientState
  drugsToProvide: Drug[]
}

export interface DrugsEffectSimulator {
  simulate(params: DrugsEffectSimulateParams): PatientState
}
