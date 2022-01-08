import { DrugsEffectSimulator } from '../drugs-effect-simulator/DrugsEffectSimulator'
import { Drug } from '../shared/Drug'
import { PatientState } from '../shared/PatientState'
import { PatientsRegister } from './PatientsRegister'

export class Quarantine {
  private static readonly DRUGS_EFFECT_SIMULATOR: DrugsEffectSimulator = 'todo' as any

  private drugs: Drug[] = []

  constructor(private patientsRegister: PatientsRegister) {}

  setDrugs(drugs: Drug[]) {
    this.drugs = drugs
  }

  wait40Days() {
    const updatedPatientsRegister: PatientsRegister = {}

    Object.entries(this.patientsRegister).forEach((register) => {
      const [patientState, numberOfPatients] = register as [PatientState, number]

      const nextState = Quarantine.DRUGS_EFFECT_SIMULATOR.simulate({
        patientState,
        drugsToProvide: this.drugs,
      })
      const numberOfPatientsWithAlreadyThatState = updatedPatientsRegister[nextState] ?? 0

      updatedPatientsRegister[nextState] = numberOfPatients + numberOfPatientsWithAlreadyThatState
    })

    this.patientsRegister = updatedPatientsRegister
  }

  report(): PatientsRegister {
    return this.patientsRegister
  }
}
