import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { Drug } from '../../../shared/domain/Drug'
import { DrugSimulator } from '../../../shared/domain/DrugSimulator'
import { PatientsRegister } from '../../../shared/domain/PatientsRegister'
import { DrugRepository } from '../../domain/DrugRepository'
import { PatientRepository } from '../../domain/PatientRepository'

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
})
export class ControlPanelComponent implements OnInit, OnDestroy {
  drugs: Drug[] = []
  patientsRegister: PatientsRegister = {}

  subscription = new Subscription()

  constructor(
    private readonly drugRepository: DrugRepository,
    private readonly patientRepository: PatientRepository,
    private readonly drugSimulator: DrugSimulator
  ) {}

  ngOnInit() {
    const getDrugsSub = this.drugRepository.getAll().subscribe((drugs) => (this.drugs = drugs))
    this.subscription.add(getDrugsSub)

    const getPatientsRegisterSub = this.patientRepository
      .getPatientsRegister()
      .subscribe((patientsRegister) => (this.patientsRegister = patientsRegister))
    this.subscription.add(getPatientsRegisterSub)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  fetchDrugs() {
    this.drugRepository.fetch()
  }

  fetchPatientsRegister() {
    this.patientRepository.fetchPatientsRegister()
  }

  simulate() {
    this.drugSimulator.simulate(this.patientsRegister, this.drugs)
  }
}
