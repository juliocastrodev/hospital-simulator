import { PatientsRegister } from '..'
import { PatientState } from '../shared/PatientState'
import { patientStatesFrom } from './PatientsRegister'

export class PatientsRegisterBuilder {
  private built: PatientsRegister = {}

  from(patientsRegister: PatientsRegister) {
    this.built = { ...patientsRegister }

    return this
  }

  decease(patientsWithState: PatientState) {
    this.change({ from: patientsWithState, to: PatientState.DEAD })

    return this
  }

  deceaseAll() {
    this.changeAll(PatientState.DEAD)

    return this
  }

  cure(patientsWithState: PatientState) {
    this.change({ from: patientsWithState, to: PatientState.HEALTH })

    return this
  }

  change(params: { from: PatientState; to: PatientState }) {
    const { from, to } = params

    if (from !== to) {
      this.built[to] = (this.built[from] ?? 0) + (this.built[to] ?? 0)
      this.built[from] = 0
    }

    return this
  }

  private changeAll(to: PatientState) {
    patientStatesFrom(this.built).forEach((patientState) => this.change({ from: patientState, to }))

    return this
  }

  build() {
    return this.built
  }
}
