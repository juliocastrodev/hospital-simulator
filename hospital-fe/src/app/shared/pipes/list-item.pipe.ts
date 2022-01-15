import { Pipe, PipeTransform } from '@angular/core'
import { ListItem } from '../components/list/ListItem'

@Pipe({ name: 'listitem' })
export class ListItemPipe implements PipeTransform {
  transform(obj: Record<string, string | number>): ListItem[] {
    return Object.entries(obj).map(([key, value]) => ({
      primary: key,
      secondary: value.toString(),
    }))
  }
}
