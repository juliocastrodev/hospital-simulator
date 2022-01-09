import { Component } from '@angular/core'

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
})
export class ControlPanelComponent {
  patients = {
    Diabéticos: 23,
    'Con fiebre': 100,
    Sanos: 33,
    Muertos: 10,
  }

  drugs = {
    Aspirina: 10,
    Insulina: 33,
  }
}
