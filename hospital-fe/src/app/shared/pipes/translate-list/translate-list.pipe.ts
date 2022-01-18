import { Pipe } from '@angular/core'
import { TranslatePipe } from '@ngx-translate/core'

@Pipe({ name: 'translateList', pure: false })
export class TranslateListPipe extends TranslatePipe {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(keys: any): string[] {
    if (!Array.isArray(keys)) throw new Error('translateList pipe can only be used with arrays')

    return keys.map((key) => super.transform(key))
  }
}
