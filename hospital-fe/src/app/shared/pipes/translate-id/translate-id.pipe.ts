import { Pipe, PipeTransform } from '@angular/core'
import { TranslateCategory } from './TranslateCategory'

@Pipe({ name: 'translateId' })
export class TranslateIdPipe implements PipeTransform {
  transform(str: string, category: TranslateCategory): string {
    return `${category}.${str.toUpperCase()}`
  }
}
