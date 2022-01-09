import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'
import { ControlPanelComponent } from './components/control-panel/control-panel.component'

const components = [ControlPanelComponent]

@NgModule({
  imports: [SharedModule],
  declarations: [...components],
  exports: [...components],
})
export class SimulationModule {}
