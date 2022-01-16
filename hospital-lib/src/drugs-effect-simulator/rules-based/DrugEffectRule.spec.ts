import { Expect, TestCase, TestFixture } from 'alsatian'
import { Drug } from '../../shared/Drug'
import { PatientState } from '../../shared/PatientState'
import { DrugEffectRule } from './DrugEffectRule'
import { DrugEffectRuleBuilder } from './DrugEffectRuleBuilder'

@TestFixture()
export class DrugEffectRuleTest {
  @TestCase(PatientState.DEAD, [])
  @TestCase(PatientState.DIABETES, [Drug.PARACETAMOL])
  @TestCase(PatientState.DIABETES, [Drug.PARACETAMOL, Drug.ASPIRIN])
  apply_withNoPreconditions_appliesTheRule(patientState: PatientState, drugsToProvide: Drug[]) {
    const rule = new DrugEffectRuleBuilder().willResult(PatientState.HEALTH).build()

    const result = rule.apply(patientState, drugsToProvide)

    Expect(result).toEqual(PatientState.HEALTH)
  }

  @TestCase(PatientState.FEVER, [])
  @TestCase(PatientState.TUBERCULOSIS, [Drug.PARACETAMOL])
  @TestCase(PatientState.FEVER, [Drug.PARACETAMOL, Drug.ASPIRIN])
  apply_withPatientStatePreconditions_appliesTheRuleIfPatientsStateMeetsThem(
    patientState: PatientState,
    drugsToProvide: Drug[]
  ) {
    const rule = new DrugEffectRuleBuilder()
      .having(PatientState.FEVER, PatientState.TUBERCULOSIS)
      .willResult(PatientState.DEAD)
      .build()

    const result = rule.apply(patientState, drugsToProvide)

    Expect(result).toEqual(PatientState.DEAD)
  }

  @TestCase(PatientState.DEAD, [])
  @TestCase(PatientState.DIABETES, [Drug.PARACETAMOL])
  @TestCase(PatientState.HEALTH, [Drug.PARACETAMOL, Drug.ASPIRIN])
  apply_withPatientStatePreconditions_doesNotApplyTheRuleIfPatientsStateDoesNotMeetThem(
    patientState: PatientState,
    drugsToProvide: Drug[]
  ) {
    const rule = new DrugEffectRuleBuilder()
      .having(PatientState.FEVER, PatientState.TUBERCULOSIS)
      .willResult(PatientState.HEALTH)
      .build()

    const result = rule.apply(patientState, drugsToProvide)

    Expect(result).not.toBeDefined()
  }

  @TestCase(PatientState.FEVER, [Drug.PARACETAMOL, Drug.ANTIBIOTIC])
  @TestCase(PatientState.TUBERCULOSIS, [Drug.ANTIBIOTIC, Drug.PARACETAMOL])
  @TestCase(PatientState.FEVER, [Drug.ANTIBIOTIC, Drug.INSULIN, Drug.INSULIN, Drug.PARACETAMOL])
  apply_withProvideDrugsPreconditions_appliesTheRuleIfDrugsToProvideMeetThem(
    patientState: PatientState,
    drugsToProvide: Drug[]
  ) {
    const rule = new DrugEffectRuleBuilder()
      .whenProvided(Drug.PARACETAMOL, Drug.ANTIBIOTIC)
      .willResult(PatientState.FEVER)
      .build()

    const result = rule.apply(patientState, drugsToProvide)

    Expect(result).toEqual(PatientState.FEVER)
  }

  @TestCase(PatientState.FEVER, [Drug.ANTIBIOTIC])
  @TestCase(PatientState.TUBERCULOSIS, [Drug.PARACETAMOL])
  @TestCase(PatientState.FEVER, [Drug.INSULIN, Drug.ASPIRIN, Drug.ANTIBIOTIC])
  apply_withProvideDrugsPreconditions_doesNotApplyTheRuleIfDrugsToProvideDoNotMeetThem(
    patientState: PatientState,
    drugsToProvide: Drug[]
  ) {
    const rule = new DrugEffectRuleBuilder()
      .whenProvided(Drug.PARACETAMOL, Drug.ANTIBIOTIC)
      .willResult(PatientState.HEALTH)
      .build()

    const result = rule.apply(patientState, drugsToProvide)

    Expect(result).not.toBeDefined()
  }

  @TestCase(PatientState.FEVER, [])
  @TestCase(PatientState.TUBERCULOSIS, [Drug.INSULIN, Drug.ASPIRIN])
  @TestCase(PatientState.FEVER, [Drug.ASPIRIN])
  apply_withDepriveDrugsPreconditions_appliesTheRuleIfDrugsToProvideMeetThem(
    patientState: PatientState,
    drugsToProvide: Drug[]
  ) {
    const rule = new DrugEffectRuleBuilder()
      .whenDeprived(Drug.PARACETAMOL, Drug.ANTIBIOTIC)
      .willResult(PatientState.HEALTH)
      .build()

    const result = rule.apply(patientState, drugsToProvide)

    Expect(result).toEqual(PatientState.HEALTH)
  }

  @TestCase(PatientState.FEVER, [Drug.ANTIBIOTIC, Drug.PARACETAMOL])
  @TestCase(PatientState.TUBERCULOSIS, [Drug.PARACETAMOL])
  @TestCase(PatientState.FEVER, [Drug.INSULIN, Drug.INSULIN, Drug.ANTIBIOTIC])
  apply_withDepriveDrugsPreconditions_doesNotApplyTheRuleIfDrugsToProvideDoNotMeetThem(
    patientState: PatientState,
    drugsToProvide: Drug[]
  ) {
    const rule = new DrugEffectRuleBuilder()
      .whenDeprived(Drug.PARACETAMOL, Drug.ANTIBIOTIC)
      .willResult(PatientState.HEALTH)
      .build()

    const result = rule.apply(patientState, drugsToProvide)

    Expect(result).not.toBeDefined()
  }

  @TestCase(PatientState.FEVER, [Drug.ANTIBIOTIC])
  @TestCase(PatientState.TUBERCULOSIS, [Drug.ANTIBIOTIC, Drug.INSULIN])
  @TestCase(PatientState.FEVER, [Drug.ANTIBIOTIC])
  apply_withMultiplePreconditions_appliesTheRuleIfPrecondionsAreMet(
    patientState: PatientState,
    drugsToProvide: Drug[]
  ) {
    const rule = new DrugEffectRuleBuilder()
      .having(PatientState.FEVER, PatientState.TUBERCULOSIS)
      .whenProvided(Drug.ANTIBIOTIC)
      .whenDeprived(Drug.PARACETAMOL, Drug.ASPIRIN)
      .willResult(PatientState.HEALTH)
      .build()

    const result = rule.apply(patientState, drugsToProvide)

    Expect(result).toEqual(PatientState.HEALTH)
  }

  @TestCase(PatientState.HEALTH, [Drug.ANTIBIOTIC])
  @TestCase(PatientState.TUBERCULOSIS, [Drug.INSULIN])
  @TestCase(PatientState.FEVER, [Drug.ANTIBIOTIC, Drug.PARACETAMOL])
  apply_withMultiplePreconditions_doesNotApplyTheRuleIfPrecondionsAreNotMet(
    patientState: PatientState,
    drugsToProvide: Drug[]
  ) {
    const rule = new DrugEffectRuleBuilder()
      .having(PatientState.FEVER, PatientState.TUBERCULOSIS)
      .whenProvided(Drug.ANTIBIOTIC)
      .whenDeprived(Drug.PARACETAMOL, Drug.ASPIRIN)
      .willResult(PatientState.HEALTH)
      .build()

    const result = rule.apply(patientState, drugsToProvide)

    Expect(result).not.toBeDefined()
  }

  @TestCase(PatientState.FEVER, [Drug.ASPIRIN])
  @TestCase(PatientState.FEVER, [Drug.ANTIBIOTIC, Drug.ASPIRIN])
  @TestCase(PatientState.FEVER, [Drug.INSULIN, Drug.ANTIBIOTIC, Drug.ASPIRIN])
  hasBeenApplied_whenTheRuleIsApplied_returnsTrue(
    patientState: PatientState,
    drugsToProvide: Drug[]
  ) {
    const rule = new DrugEffectRuleBuilder()
      .having(PatientState.FEVER)
      .whenProvided(Drug.ASPIRIN)
      .willResult(PatientState.HEALTH)
      .build()
    const result = rule.apply(patientState, drugsToProvide)

    const hasBeenApplied = DrugEffectRule.hasBeenApplied(result)

    Expect(hasBeenApplied).toEqual(true)
  }

  @TestCase(PatientState.TUBERCULOSIS, [Drug.ASPIRIN])
  @TestCase(PatientState.FEVER, [])
  @TestCase(PatientState.FEVER, [Drug.INSULIN, Drug.ANTIBIOTIC, Drug.PARACETAMOL])
  hasBeenApplied_whenTheRuleIsNotApplied_returnsFalse(
    patientState: PatientState,
    drugsToProvide: Drug[]
  ) {
    const rule = new DrugEffectRuleBuilder()
      .having(PatientState.FEVER)
      .whenProvided(Drug.ASPIRIN)
      .willResult(PatientState.HEALTH)
      .build()
    const result = rule.apply(patientState, drugsToProvide)

    const hasBeenApplied = DrugEffectRule.hasBeenApplied(result)

    Expect(hasBeenApplied).toEqual(false)
  }
}
