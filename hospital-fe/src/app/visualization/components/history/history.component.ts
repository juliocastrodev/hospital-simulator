import { Component } from '@angular/core'
import { SimulationRegister } from '../../domain/SimulationRegister'

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent {
  myDate = new Date()

  registers: SimulationRegister[] = [
    {
      id: '#123',
      date: new Date('2021/01/01'),
      patients: { F: 1, D: 4, X: 10 },
      drugs: ['As', 'I', 'P'],
      results: { F: 1, D: 0, X: 14 },
    },
    {
      id: '#8392',
      date: new Date(),
      patients: { F: 1, X: 0 },
      drugs: ['P'],
      results: { F: 0, X: 1 },
    },
  ]
}
