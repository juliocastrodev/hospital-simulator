import { Drug } from './Drug'
import { PatientsRegister } from './PatientsRegister'
import { nanoid } from 'nanoid'

export class SimulationRegister {
  id: string
  date: Date
  patients: PatientsRegister
  drugs: Drug[]
  results: PatientsRegister

  constructor(props: Pick<SimulationRegister, 'id' | 'date' | 'patients' | 'drugs' | 'results'>) {
    this.id = props.id
    this.date = props.date
    this.patients = props.patients
    this.drugs = props.drugs
    this.results = props.results
  }

  static create(props: Pick<SimulationRegister, 'patients' | 'drugs' | 'results'>) {
    return new SimulationRegister({
      ...props,
      id: nanoid(5),
      date: new Date(),
    })
  }
}
