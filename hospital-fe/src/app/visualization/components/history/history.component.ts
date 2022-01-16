import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { DrugSimulator } from '../../../shared/domain/DrugSimulator'
import { SimulationRegister } from '../../../shared/domain/SimulationRegister'

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent {
  history$: Observable<SimulationRegister[]>

  constructor(public readonly drugsSimulator: DrugSimulator) {
    this.history$ = drugsSimulator.getHistory()
  }
}
