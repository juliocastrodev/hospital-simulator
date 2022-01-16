import { Expect, Setup, TestCase, TestFixture } from 'alsatian'
import { Drug } from '../../shared/Drug'
import { PatientState } from '../../shared/PatientState'
import { RulesBasedDrugsEffectSimulator } from './RulesBasedDrugsEffectSimulator'

@TestFixture()
export class RulesBasedDrugsEffectSimulatorTest {
  simulator!: RulesBasedDrugsEffectSimulator

  @Setup
  setup() {
    this.simulator = new RulesBasedDrugsEffectSimulator()
  }

  @TestCase(PatientState.DEAD, [])
  @TestCase(PatientState.TUBERCULOSIS, [Drug.PARACETAMOL])
  @TestCase(PatientState.HEALTH, [Drug.INSULIN])
  simulate_whenNoRuleIsApplied_returnsTheSameState(
    patientState: PatientState,
    drugsToProvide: Drug[]
  ) {
    const result = this.simulator.simulate(patientState, drugsToProvide)

    Expect(result).toEqual(patientState)
  }

  @TestCase(
    PatientState.DIABETES,
    [Drug.INSULIN, Drug.ASPIRIN, Drug.PARACETAMOL],
    PatientState.DEAD
  )
  @TestCase(PatientState.FEVER, [Drug.ASPIRIN, Drug.PARACETAMOL], PatientState.DEAD)
  @TestCase(
    PatientState.DIABETES,
    [Drug.INSULIN, Drug.PARACETAMOL, Drug.ASPIRIN],
    PatientState.DEAD
  )
  simulate_whenRulesAreApplied_returnsTheResultOfTheWithHigherPrecedence(
    patientState: PatientState,
    drugsToProvide: Drug[],
    expectedState: PatientState
  ) {
    const result = this.simulator.simulate(patientState, drugsToProvide)

    Expect(result).toEqual(expectedState)
  }
}
