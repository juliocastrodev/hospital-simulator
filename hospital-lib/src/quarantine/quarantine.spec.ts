import { Expect, Test, TestFixture } from 'alsatian'
import { Drug } from '../shared/Drug'
import { PatientState } from '../shared/PatientState'
import { ALL_ALIVE_BUT_WITH_DISEASES } from './fixtures/patientsRegisters'
import { PatientsRegisterBuilder } from './PatientsRegisterBuilder'
import { Quarantine } from './Quarantine'

@TestFixture()
export class QuarantineTest {
  @Test()
  report_beforeTreatment_patientsStayTheSame() {
    const quarantine = new Quarantine(ALL_ALIVE_BUT_WITH_DISEASES)

    const report = quarantine.report()

    Expect(report).toEqual(ALL_ALIVE_BUT_WITH_DISEASES)
  }

  @Test()
  report_afterTreatmentWithoutDrugs_patientsStayTheSameButDiabeticsDie() {
    const quarantine = new Quarantine(ALL_ALIVE_BUT_WITH_DISEASES)
    quarantine.wait40Days()
    const expectedReport = new PatientsRegisterBuilder()
      .from(ALL_ALIVE_BUT_WITH_DISEASES)
      .decease(PatientState.DIABETES)
      .build()

    const report = quarantine.report()

    Expect(report).toEqual(expectedReport)
  }

  @Test()
  report_afterTreatmentWithAspirine_patientsWithFeverGetCuredAndTheRestStaysTheSameButDiabeticsDie() {
    const quarantine = new Quarantine(ALL_ALIVE_BUT_WITH_DISEASES)
    quarantine.setDrugs([Drug.ASPIRIN])
    quarantine.wait40Days()
    const expectedReport = new PatientsRegisterBuilder()
      .from(ALL_ALIVE_BUT_WITH_DISEASES)
      .cure(PatientState.FEVER)
      .decease(PatientState.DIABETES)
      .build()

    const report = quarantine.report()

    Expect(report).toEqual(expectedReport)
  }

  @Test()
  report_afterTreatmentWithAntibiotic_patientsWithTubercuolsisGetCuredAndTheRestStaysTheSameButDiabeticsDie() {
    const quarantine = new Quarantine(ALL_ALIVE_BUT_WITH_DISEASES)
    quarantine.setDrugs([Drug.ANTIBIOTIC])
    quarantine.wait40Days()
    const expectedReport = new PatientsRegisterBuilder()
      .from(ALL_ALIVE_BUT_WITH_DISEASES)
      .cure(PatientState.TUBERCULOSIS)
      .decease(PatientState.DIABETES)
      .build()

    const report = quarantine.report()

    Expect(report).toEqual(expectedReport)
  }

  @Test()
  report_afterTreatmentWithInsulin_patientsStayTheSame() {
    const quarantine = new Quarantine(ALL_ALIVE_BUT_WITH_DISEASES)
    quarantine.setDrugs([Drug.INSULIN])
    quarantine.wait40Days()

    const report = quarantine.report()

    Expect(report).toEqual(ALL_ALIVE_BUT_WITH_DISEASES)
  }

  @Test()
  report_afterTreatmentWithAntibioticAndInsulin_patientsWithTuberculosisGetCuredAndTheRestStaysTheSameButHealthyPatientsCatchFever() {
    const quarantine = new Quarantine(ALL_ALIVE_BUT_WITH_DISEASES)
    quarantine.setDrugs([Drug.ANTIBIOTIC, Drug.INSULIN])
    quarantine.wait40Days()
    const expectedReport = new PatientsRegisterBuilder()
      .from(ALL_ALIVE_BUT_WITH_DISEASES)
      .change({ from: PatientState.HEALTH, to: PatientState.FEVER })
      .cure(PatientState.TUBERCULOSIS)
      .build()

    const report = quarantine.report()

    Expect(report).toEqual(expectedReport)
  }

  @Test()
  report_afterTreatmentWithParacetamol_patientsWithFeverGetCuredAndTheRestStaysTheSameButDiabeticsDie() {
    const quarantine = new Quarantine(ALL_ALIVE_BUT_WITH_DISEASES)
    quarantine.setDrugs([Drug.PARACETAMOL])
    quarantine.wait40Days()
    const expectedReport = new PatientsRegisterBuilder()
      .from(ALL_ALIVE_BUT_WITH_DISEASES)
      .cure(PatientState.FEVER)
      .decease(PatientState.DIABETES)
      .build()

    const report = quarantine.report()

    Expect(report).toEqual(expectedReport)
  }

  @Test()
  report_afterTreatmentWithParacetamolAndAspirin_allPatiensDie() {
    const quarantine = new Quarantine(ALL_ALIVE_BUT_WITH_DISEASES)
    quarantine.setDrugs([Drug.PARACETAMOL, Drug.ASPIRIN])
    quarantine.wait40Days()
    const expectedReport = new PatientsRegisterBuilder()
      .from(ALL_ALIVE_BUT_WITH_DISEASES)
      .deceaseAll()
      .build()

    const report = quarantine.report()

    Expect(report).toEqual(expectedReport)
  }
}
