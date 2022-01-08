import { Drug } from '../../shared/Drug'
import { PatientState } from '../../shared/PatientState'
import { DrugEffectRule, DrugEffectRuleCreateParams } from './DrugEffectRule'

export class DrugEffectRuleBuilder {
  private built: Partial<DrugEffectRuleCreateParams> = {}

  having(...patientStates: PatientState[]) {
    this.built.patientPreconditions = patientStates

    return this
  }

  whenProvided(...drugs: Drug[]) {
    this.built.providePreconditions = drugs

    return this
  }

  whenDeprived(...drugs: Drug[]) {
    this.built.deprivePreconditions = drugs

    return this
  }

  willResult(patientState: PatientState) {
    this.built.applicationResult = patientState

    return this
  }

  build() {
    this.ensureAllNecessaryPropertiesAreDefined()

    return new DrugEffectRule(this.built as DrugEffectRuleCreateParams)
  }

  private ensureAllNecessaryPropertiesAreDefined() {
    const propertiesToCheck: (keyof DrugEffectRuleCreateParams)[] = ['applicationResult']

    const incompleteProperties = propertiesToCheck.filter((prop) => !this.built[prop])

    if (incompleteProperties.length)
      throw new Error(
        `Incomplete builder. Missing properties: [${incompleteProperties.join(', ').trim()}]`
      )
  }
}
