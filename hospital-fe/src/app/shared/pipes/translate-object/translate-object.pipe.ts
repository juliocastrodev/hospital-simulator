import { Pipe } from '@angular/core'
import { TranslatePipe } from '@ngx-translate/core'
import { ObjectPart } from './ObjectPart'

@Pipe({ name: 'translateObject', pure: false })
export class TranslateObjectPipe extends TranslatePipe {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(obj: any, consider: ObjectPart): Record<string, string> {
    if (Object(obj) !== obj) throw new Error('translateObject pipe can only be used with objects')

    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => {
        const valueStr = `${value}`

        if (consider === 'KEYS') return [super.transform(key), valueStr]
        if (consider === 'VALUES') return [key, super.transform(valueStr)]

        return [super.transform(key), super.transform(valueStr)]
      })
    )
  }
}
