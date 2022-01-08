import { PatientState } from '../../shared/PatientState'

export const ALL_ALIVE_BUT_WITH_DISEASES = {
  [PatientState.FEVER]: 1,
  [PatientState.HEALTH]: 2,
  [PatientState.DIABETES]: 3,
  [PatientState.TUBERCULOSIS]: 1,
  [PatientState.DEAD]: 0,
} as const
