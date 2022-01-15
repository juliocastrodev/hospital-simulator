import { Pipe, PipeTransform } from '@angular/core'
import { TranslateIdPipe } from '../translate-id/translate-id.pipe'
import { TranslateCategory } from '../translate-id/TranslateCategory'

@Pipe({ name: 'listTranslateIds' })
export class ListTranslateIdsPipe implements PipeTransform {
  constructor(private readonly translateIdPipe: TranslateIdPipe) {}

  transform(arr: string[], category: TranslateCategory): string[] {
    return arr.map((str) => this.translateIdPipe.transform(str, category))
  }
}
