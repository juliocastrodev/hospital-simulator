import { Component, HostBinding, Input } from '@angular/core'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() hasShadow = false

  @HostBinding('class')
  get cardClasses() {
    const classes: string[] = []

    if (this.hasShadow) classes.push('shadow')

    return classes
  }
}
