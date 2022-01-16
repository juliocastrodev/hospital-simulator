import { Expect, Test, TestFixture } from 'alsatian'
import { Drug } from '../../shared/Drug'
import { PatientState } from '../../shared/PatientState'
import { DrugEffectRule } from './DrugEffectRule'
import { DrugEffectRuleBuilder } from './DrugEffectRuleBuilder'

@TestFixture()
export class DrugEffectRuleBuilderTest {
  @Test()
  build_withNoInteractions_throwsAnIncompleteBuilderError() {
    const builder = new DrugEffectRuleBuilder()

    Expect(() => builder.build()).toThrowError(
      Error,
      'Incomplete builder. Missing properties: [applicationResult]'
    )
  }

  @Test()
  build_withNoPreconditions_createsTheRuleWithoutThem() {
    const builder = new DrugEffectRuleBuilder().willResult(PatientState.HEALTH)

    const register = builder.build()

    Expect(register).toEqual(new DrugEffectRule({ applicationResult: PatientState.HEALTH }))
  }

  @Test()
  build_withPreconditions_createsTheRuleWithThem() {
    const builder = new DrugEffectRuleBuilder()
      .having(PatientState.DIABETES, PatientState.TUBERCULOSIS)
      .whenProvided(Drug.ASPIRIN, Drug.INSULIN, Drug.PARACETAMOL)
      .willResult(PatientState.HEALTH)

    const register = builder.build()

    Expect(register).toEqual(
      new DrugEffectRule({
        patientPreconditions: [PatientState.DIABETES, PatientState.TUBERCULOSIS],
        providePreconditions: [Drug.ASPIRIN, Drug.INSULIN, Drug.PARACETAMOL],
        applicationResult: PatientState.HEALTH,
      })
    )
  }
}
