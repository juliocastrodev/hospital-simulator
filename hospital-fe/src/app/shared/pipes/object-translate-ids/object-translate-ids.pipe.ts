import { Pipe, PipeTransform } from '@angular/core'
import { TranslateIdPipe } from '../translate-id/translate-id.pipe'
import { TranslateCategory } from '../translate-id/TranslateCategory'
import { ObjectPart } from '../translate-object/ObjectPart'

@Pipe({ name: 'objectTranslateIds' })
export class ObjectTranslateIdsPipe implements PipeTransform {
  constructor(private readonly translateIdPipe: TranslateIdPipe) {}

  transform(
    obj: Record<string, unknown>,
    params: { consider: ObjectPart; category: TranslateCategory }
  ): Record<string, string> {
    const { consider, category } = params

    const translateId = (str: string) => this.translateIdPipe.transform(str, category)

    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => {
        const valueStr = `${value}`

        if (consider === 'KEYS') return [translateId(key), valueStr]
        if (consider === 'VALUES') return [key, translateId(valueStr)]

        return [translateId(key), translateId(valueStr)]
      })
    )
  }
}
