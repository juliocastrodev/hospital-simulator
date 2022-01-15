import { Pipe, PipeTransform } from '@angular/core'
import { ListItem } from '../../components/list/ListItem'

type ListItemPipeInput = Record<string, unknown> | unknown[]

@Pipe({ name: 'listItem' })
export class ListItemPipe implements PipeTransform {
  transform(input: ListItemPipeInput): ListItem[] {
    if (Array.isArray(input)) return input.map((elem) => ({ primary: `${elem}` }))

    return Object.entries(input).map(([key, value]) => ({
      primary: key,
      secondary: `${value}`,
    }))
  }
}
