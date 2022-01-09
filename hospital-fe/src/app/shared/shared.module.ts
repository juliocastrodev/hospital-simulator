import { NgModule } from '@angular/core'
import { CardComponent } from './components/card/card.component'
import { ButtonComponent } from './components/button/button.component'
import { BrowserModule } from '@angular/platform-browser'
import { ListComponent } from './components/list/list.component'
import { ListItemPipe } from './pipes/list-item.pipe'
import { StackComponent } from './components/stack/stack.component'

const components = [CardComponent, ButtonComponent, ListComponent, StackComponent]

const pipes = [ListItemPipe]

@NgModule({
  imports: [BrowserModule],
  declarations: [...components, ...pipes],
  exports: [...components, ...pipes],
})
export class SharedModule {}
