import { Component, Input } from '@angular/core'
import { SimulationRegister } from '../../../shared/domain/SimulationRegister'

@Component({
  selector: 'app-simulation-register',
  templateUrl: './simulation-register.component.html',
  styleUrls: ['./simulation-register.component.scss'],
})
export class SimulationRegisterComponent {
  @Input() register!: SimulationRegister
}
