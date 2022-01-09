import { NgModule } from '@angular/core'
import { CardComponent } from './components/card/card.component'
import { ButtonComponent } from './components/button/button.component'

const components = [CardComponent, ButtonComponent]

@NgModule({
  declarations: [...components],
  exports: [...components],
})
export class SharedModule {}
