import { Component } from '@angular/core'

@Component({
  selector: 'app-simulation-register',
  templateUrl: './simulation-register.component.html',
  styleUrls: ['./simulation-register.component.scss'],
})
export class SimulationRegisterComponent {
  myDate = new Date()
  foo = [
    {
      primary: 'D',
      secondary: '2',
    },
    {
      primary: 'T',
      secondary: '2',
    },
    {
      primary: 'T',
      secondary: '2',
    },
    {
      primary: 'T',
      secondary: '2',
    },
    {
      primary: 'T',
      secondary: '2',
    },
    {
      primary: 'T',
      secondary: '2',
    },
  ]
}
