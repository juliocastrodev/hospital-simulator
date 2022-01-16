import { Component, OnDestroy, OnInit } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { Drug } from '../../../shared/domain/drugs/Drug'
import { DrugRepository } from '../../../shared/domain/drugs/DrugRepository'
import { PatientRepository } from '../../../shared/domain/patients/PatientRepository'
import { PatientsRegister } from '../../../shared/domain/patients/PatientsRegister'

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
})
export class ControlPanelComponent implements OnInit, OnDestroy {
  drugs$: Observable<Drug[]>
  patientsRegister$: Observable<PatientsRegister>

  subscription = new Subscription()

  constructor(
    private readonly drugRepository: DrugRepository,
    private readonly patientRepository: PatientRepository
  ) {
    this.drugs$ = this.drugRepository.getAll()
    this.patientsRegister$ = this.patientRepository.getPatientsRegister()
  }

  ngOnInit() {
    this.fetchDrugs()
    this.fetchPatientsRegister()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  fetchDrugs() {
    this.subscription.add(this.drugRepository.fetch().subscribe())
  }

  fetchPatientsRegister() {
    this.subscription.add(this.patientRepository.fetchPatientsRegister().subscribe())
  }
}
