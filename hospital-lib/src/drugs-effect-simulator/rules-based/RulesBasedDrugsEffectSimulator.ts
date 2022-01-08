import { Drug } from '../../shared/Drug'
import { PatientState } from '../../shared/PatientState'
import { DrugsEffectsSimulator } from '../DrugsEffectSimulator'
import { DrugEffectRule } from './DrugEffectRule'
import { DrugEffectRuleBuilder } from './DrugEffectRuleBuilder'
import { RuleApplicationPrecedence } from './RuleApplicationPrecedence'

export class RulesBasedDrugsEffectSimulator implements DrugsEffectsSimulator {
  private static readonly RULES: DrugEffectRule[] = [
    new DrugEffectRuleBuilder()
      .whenProvided(Drug.ASPIRIN)
      .having(PatientState.FEVER)
      .willResult(PatientState.HEALTH)
      .build(),
    new DrugEffectRuleBuilder()
      .whenProvided(Drug.ANTIBIOTIC)
      .having(PatientState.TUBERCULOSIS)
      .willResult(PatientState.HEALTH)
      .build(),
    new DrugEffectRuleBuilder()
      .whenDeprived(Drug.INSULIN)
      .having(PatientState.DIABETES)
      .willResult(PatientState.DEAD)
      .build(),
    new DrugEffectRuleBuilder()
      .whenProvided(Drug.INSULIN, Drug.ANTIBIOTIC)
      .having(PatientState.HEALTH)
      .willResult(PatientState.FEVER)
      .build(),
    new DrugEffectRuleBuilder()
      .whenProvided(Drug.PARACETAMOL)
      .having(PatientState.FEVER)
      .willResult(PatientState.HEALTH)
      .build(),
    new DrugEffectRuleBuilder()
      .whenProvided(Drug.PARACETAMOL, Drug.ASPIRIN)
      .willResult(PatientState.DEAD)
      .build(),
  ]

  private static readonly RULE_APPLICATION_PRECEDENCE: RuleApplicationPrecedence = {
    [PatientState.DEAD]: 2,
    [PatientState.HEALTH]: 1,
    [PatientState.FEVER]: 1,
    [PatientState.DIABETES]: 1,
    [PatientState.TUBERCULOSIS]: 1,
  }

  simulate(patientState: PatientState, drugsToProvide: Drug[]): PatientState {
    const appliedRulesResults = RulesBasedDrugsEffectSimulator.RULES.map((rule) =>
      rule.apply(patientState, drugsToProvide)
    ).filter(this.ruleThatHasBeenApplied)

    if (!appliedRulesResults.length) return patientState

    return appliedRulesResults.reduce(this.higherPrecedence)
  }

  private ruleThatHasBeenApplied(
    ruleApplicationResult: PatientState | undefined
  ): ruleApplicationResult is PatientState {
    return Boolean(ruleApplicationResult)
  }

  private higherPrecedence(s1: PatientState, s2: PatientState) {
    const s1Precedence = RulesBasedDrugsEffectSimulator.RULE_APPLICATION_PRECEDENCE[s1] ?? 0
    const s2Precedence = RulesBasedDrugsEffectSimulator.RULE_APPLICATION_PRECEDENCE[s2] ?? 0

    return s1Precedence > s2Precedence ? s1 : s2
  }
}
