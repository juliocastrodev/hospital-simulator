import { Component, Input } from '@angular/core'
import { ListItem } from '../../types/ListItem'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input()
  items: ListItem[] = []
}
