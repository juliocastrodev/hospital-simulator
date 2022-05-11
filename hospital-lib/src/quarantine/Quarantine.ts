import { DrugsEffectsSimulator } from '../drugs-effect-simulator/DrugsEffectSimulator'
import { RulesBasedDrugsEffectSimulator } from '../drugs-effect-simulator/rules-based/RulesBasedDrugsEffectSimulator'
import { Drug } from '../shared/Drug'
import { PatientsRegister, patientStatesFrom } from './PatientsRegister'
import { PatientsRegisterBuilder } from './PatientsRegisterBuilder'

export class Quarantine {
  private static readonly DRUGS_EFFECT_SIMULATOR: DrugsEffectsSimulator =
    new RulesBasedDrugsEffectSimulator()

  private drugs: Drug[] = []

  constructor(private patientsRegister: PatientsRegister) {}

  setDrugs(drugs: Drug[]) {
    this.drugs = drugs
  }

  wait40Days() {
    const builder = new PatientsRegisterBuilder().from(this.patientsRegister)

    patientStatesFrom(this.patientsRegister).map((patientState) =>
      Quarantine.DRUGS_EFFECT_SIMULATOR.simulate(patientState, this.drugs)
    )

    patientStatesFrom(this.patientsRegister).forEach((patientState) => {
      const nextState = Quarantine.DRUGS_EFFECT_SIMULATOR.simulate(patientState, this.drugs)

      builder.change({ from: patientState, to: nextState })
    })

    this.patientsRegister = builder.build()
  }

  report() {
    return this.patientsRegister
  }
}
