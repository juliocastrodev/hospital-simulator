import { Component, HostBinding, Input } from '@angular/core'
import { ListItem } from '../../types/ListItem'
import { ListType } from '../../types/ListType'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() type: ListType = 'BULLET'
  @Input() items: ListItem[] = []

  @HostBinding('class')
  get classes() {
    const classes: string[] = []

    classes.push(this.type.toLowerCase())
    classes.push('hola')

    return classes
  }
}
