import { Component, HostBinding, Input } from '@angular/core'
import { Alignment } from './Alignment'
import { Direction } from './Direction'
import { Distance } from './Distance'

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.scss'],
})
export class StackComponent {
  @Input() allowWrap = false
  @Input() gap?: Distance
  @Input() direction: Direction = 'HORIZONTAL'
  @Input() justify: Alignment = 'SPACED'
  @Input() align: Alignment = 'CENTER'

  @HostBinding('class')
  get classes() {
    const classes: string[] = []

    if (this.allowWrap) classes.push('wrap')
    if (this.gap) classes.push(`gap-${this.gap.toLowerCase()}`)
    classes.push(`direction-${this.direction.toLowerCase()}`)
    classes.push(`justify-${this.justify.toLowerCase()}`)
    classes.push(`align-${this.align.toLowerCase()}`)

    return classes
  }
}
