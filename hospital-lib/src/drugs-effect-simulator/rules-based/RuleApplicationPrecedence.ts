import { PatientState } from '../../shared/PatientState'

/**
 * Higher the number higher the precedence
 */
export type RuleApplicationPrecedence = {
  [key in PatientState]?: number
}
