import { NgModule } from '@angular/core'
import { TitleComponent } from './title/title.component'
import { CardComponent } from './card/card.component'

const components = [TitleComponent, CardComponent]

@NgModule({
  declarations: [...components],
  exports: [...components],
})
export class ComponentsModule {}
