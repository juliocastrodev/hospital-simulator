import { Drug } from '../../shared/Drug'
import { PatientState } from '../../shared/PatientState'

export type DrugEffectRuleCreateParams = {
  patientPreconditions?: PatientState[]
  providePreconditions?: Drug[]
  deprivePreconditions?: Drug[]
  applicationResult: PatientState
}

export class DrugEffectRule {
  constructor(private readonly props: DrugEffectRuleCreateParams) {}

  apply(patientState: PatientState, drugsToProvide: Drug[]) {
    const { applicationResult } = this.props

    return this.isApplicable(patientState, drugsToProvide) ? applicationResult : undefined
  }

  private isApplicable(patientState: PatientState, drugsToProvide: Drug[]) {
    const { patientPreconditions, providePreconditions, deprivePreconditions } = this.props

    return (
      (!patientPreconditions || patientPreconditions.includes(patientState)) &&
      (!providePreconditions ||
        providePreconditions.every((drug) => drugsToProvide.includes(drug))) &&
      (!deprivePreconditions ||
        deprivePreconditions.every((drug) => !drugsToProvide.includes(drug)))
    )
  }

  static hasBeenApplied(
    ruleApplicationResult: ReturnType<DrugEffectRule['apply']>
  ): ruleApplicationResult is PatientState {
    return Boolean(ruleApplicationResult)
  }
}
