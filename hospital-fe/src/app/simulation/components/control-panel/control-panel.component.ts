import { Component, OnDestroy, OnInit } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
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

    this.fetchDrugs()
    this.fetchPatientsRegister()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  fetchDrugs() {
    const fetchDrugsSub = this.drugRepository.fetch().subscribe()
    this.subscription.add(fetchDrugsSub)
  }

  fetchPatientsRegister() {
    const fetchPatientsRegisterSub = this.patientRepository.fetchPatientsRegister().subscribe()
    this.subscription.add(fetchPatientsRegisterSub)
  }

  simulate() {
    const drugSimulationSub = this.drugSimulator
      .simulate(this.patientsRegister, this.drugs)
      .subscribe()
    this.subscription.add(drugSimulationSub)
  }
}
