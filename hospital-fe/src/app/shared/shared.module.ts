import { NgModule } from '@angular/core'
import { TitleComponent } from './components/title/title.component'
import { CardComponent } from './components/card/card.component'

const components = [TitleComponent, CardComponent]

@NgModule({
  declarations: [...components],
  exports: [...components],
})
export class SharedModule {}
