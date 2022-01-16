import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ListItem } from '../../../shared/components/list/ListItem'

@Component({
  selector: 'app-panel-list',
  templateUrl: './panel-list.component.html',
  styleUrls: ['./panel-list.component.scss'],
})
export class PanelListComponent {
  @Input() title = ''
  @Input() items: ListItem[] = []
  @Input() button = ''

  @Output() buttonclick = new EventEmitter()
}
