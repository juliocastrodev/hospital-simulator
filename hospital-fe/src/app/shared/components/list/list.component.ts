import { Component, HostBinding, Input } from '@angular/core'
import { ListItem } from './ListItem'
import { ListType } from './ListType'

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

    return classes
  }
}
