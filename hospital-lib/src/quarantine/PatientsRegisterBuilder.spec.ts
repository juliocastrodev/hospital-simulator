import { Expect, Test, TestFixture } from 'alsatian'
import { PatientState } from '../shared/PatientState'
import { ALL_ALIVE_BUT_WITH_DISEASES } from './fixtures/patientsRegisters'
import { PatientsRegisterBuilder } from './PatientsRegisterBuilder'

@TestFixture()
export class PatientsRegisterBuilderTest {
  @Test()
  build_withNoInteractions_retrievesEmptyRegister() {
    const builder = new PatientsRegisterBuilder()

    const register = builder.build()

    Expect(register).toEqual({})
  }

  @Test()
  build_fromExistingRegisterButwithNoInteractions_retrievesSameRegister() {
    const builder = new PatientsRegisterBuilder().from(ALL_ALIVE_BUT_WITH_DISEASES)

    const register = builder.build()

    Expect(register).toEqual(ALL_ALIVE_BUT_WITH_DISEASES)
  }

  @Test()
  build_usingDeceaseOnSpecificPatients_marksThemAsDied() {
    const builder = new PatientsRegisterBuilder()
      .from({
        [PatientState.HEALTH]: 10,
        [PatientState.FEVER]: 5,
      })
      .decease(PatientState.HEALTH)

    const register = builder.build()

    Expect(register).toEqual({
      [PatientState.HEALTH]: 0,
      [PatientState.FEVER]: 5,
      [PatientState.DEAD]: 10,
    })
  }

  @Test()
  build_usingDeceaseAll_marksAllPatientsAsDied() {
    const builder = new PatientsRegisterBuilder()
      .from({
        [PatientState.HEALTH]: 10,
        [PatientState.FEVER]: 3,
        [PatientState.TUBERCULOSIS]: 2,
      })
      .deceaseAll()

    const register = builder.build()

    Expect(register).toEqual({
      [PatientState.HEALTH]: 0,
      [PatientState.FEVER]: 0,
      [PatientState.TUBERCULOSIS]: 0,
      [PatientState.DEAD]: 15,
    })
  }

  @Test()
  build_usingCureOnSpecificPatients_marksThemAsHealthy() {
    const builder = new PatientsRegisterBuilder()
      .from({
        [PatientState.DIABETES]: 1,
        [PatientState.TUBERCULOSIS]: 3,
        [PatientState.DEAD]: 8,
      })
      .cure(PatientState.TUBERCULOSIS)

    const register = builder.build()

    Expect(register).toEqual({
      [PatientState.DIABETES]: 1,
      [PatientState.TUBERCULOSIS]: 0,
      [PatientState.HEALTH]: 3,
      [PatientState.DEAD]: 8,
    })
  }

  @Test()
  build_usingChange_movesPatientsFromStartToTargetState() {
    const builder = new PatientsRegisterBuilder()
      .from({
        [PatientState.HEALTH]: 12,
        [PatientState.FEVER]: 3,
      })
      .change({ from: PatientState.HEALTH, to: PatientState.FEVER })

    const register = builder.build()

    Expect(register).toEqual({
      [PatientState.HEALTH]: 0,
      [PatientState.FEVER]: 15,
    })
  }

  @Test()
  build_usingChangeWithSameStartAndTargetState_keepsPatientsInTheSameState() {
    const builder = new PatientsRegisterBuilder()
      .from(ALL_ALIVE_BUT_WITH_DISEASES)
      .change({ from: PatientState.DIABETES, to: PatientState.DIABETES })

    const register = builder.build()

    Expect(register).toEqual(ALL_ALIVE_BUT_WITH_DISEASES)
  }

  @Test()
  build_usingChangeMultipleTimes_movesPatientsSequentiallyFromStartToTargetState() {
    const builder = new PatientsRegisterBuilder()
      .from({
        [PatientState.FEVER]: 1,
        [PatientState.TUBERCULOSIS]: 2,
        [PatientState.DIABETES]: 3,
        [PatientState.HEALTH]: 4,
        [PatientState.DEAD]: 10,
      })
      .change({ from: PatientState.FEVER, to: PatientState.TUBERCULOSIS })
      .change({ from: PatientState.TUBERCULOSIS, to: PatientState.DIABETES })
      .change({ from: PatientState.DIABETES, to: PatientState.HEALTH })
      .change({ from: PatientState.HEALTH, to: PatientState.DEAD })

    const register = builder.build()

    Expect(register).toEqual({
      [PatientState.FEVER]: 0,
      [PatientState.TUBERCULOSIS]: 0,
      [PatientState.DIABETES]: 0,
      [PatientState.HEALTH]: 0,
      [PatientState.DEAD]: 20,
    })
  }

  @Test()
  build_usingMultipleActions_sequentiallyAppliesThemToPatients() {
    const builder = new PatientsRegisterBuilder()
      .from({
        [PatientState.FEVER]: 10,
        [PatientState.TUBERCULOSIS]: 1,
        [PatientState.DIABETES]: 2,
        [PatientState.HEALTH]: 3,
        [PatientState.DEAD]: 4,
      })
      .cure(PatientState.FEVER)
      .decease(PatientState.HEALTH)
      .change({ from: PatientState.FEVER, to: PatientState.DIABETES })
      .change({ from: PatientState.DIABETES, to: PatientState.FEVER })

    const register = builder.build()

    Expect(register).toEqual({
      [PatientState.FEVER]: 2,
      [PatientState.TUBERCULOSIS]: 1,
      [PatientState.DIABETES]: 0,
      [PatientState.HEALTH]: 0,
      [PatientState.DEAD]: 17,
    })
  }
}
