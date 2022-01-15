import { Component } from '@angular/core'
import { Drug } from '../../../shared/domain/Drug'
import { PatientsRegister } from '../../../shared/domain/PatientsRegister'

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
})
export class ControlPanelComponent {
  patients: PatientsRegister = {
    D: 23,
    F: 100,
    H: 33,
    X: 10,
  }

  drugs: Drug[] = ['As', 'I']
}
