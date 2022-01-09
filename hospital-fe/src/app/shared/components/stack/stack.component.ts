import { Component, HostBinding, Input } from '@angular/core'
import { Alignment } from '../../types/Alignment'
import { Direction } from '../../types/Direction'
import { Distance } from '../../types/Distance'

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.scss'],
})
export class StackComponent {
  @Input() allowWrap = false
  @Input() direction: Direction = 'HORIZONTAL'
  @Input() gap?: Distance
  @Input() justify: Alignment = 'SPACED'
  @Input() align: Alignment = 'CENTER'

  @HostBinding('class')
  get cardClasses() {
    const classes: string[] = []

    if (this.allowWrap) classes.push('wrap')
    if (this.direction === 'VERTICAL') classes.push('vertical')
    if (this.gap) classes.push(`gap-${this.gap.toLowerCase()}`)
    classes.push(`justify-${this.justify.toLowerCase()}`)
    classes.push(`align-${this.align.toLowerCase()}`)

    return classes
  }
}
