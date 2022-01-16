import { NgModule } from '@angular/core'
import { CardComponent } from './components/card/card.component'
import { ButtonComponent } from './components/button/button.component'
import { BrowserModule } from '@angular/platform-browser'
import { ListComponent } from './components/list/list.component'
import { ListItemPipe } from './pipes/list-item/list-item.pipe'
import { StackComponent } from './components/stack/stack.component'
import { TranslateIdPipe } from './pipes/translate-id/translate-id.pipe'
import { TranslateListPipe } from './pipes/translate-list/translate-list.pipe'
import { ListTranslateIdsPipe } from './pipes/list-translate-ids/list-translate-ids.pipe'
import { ObjectTranslateIdsPipe } from './pipes/object-translate-ids/object-translate-ids.pipe'
import { TranslateObjectPipe } from './pipes/translate-object/translate-object.pipe'
import { TranslateModule } from '@ngx-translate/core'

const components = [CardComponent, ButtonComponent, ListComponent, StackComponent]

const pipes = [
  ListItemPipe,
  TranslateIdPipe,
  TranslateListPipe,
  ListTranslateIdsPipe,
  ObjectTranslateIdsPipe,
  TranslateObjectPipe,
]

const providers = [TranslateIdPipe]

@NgModule({
  imports: [BrowserModule, TranslateModule],
  declarations: [...components, ...pipes],
  providers: [...providers],
  exports: [...components, ...pipes],
})
export class SharedModule {}
