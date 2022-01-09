import { Component, Input } from '@angular/core'
import { ButtonType } from './ButtonType'

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() type: ButtonType = 'PRIMARY'
}
