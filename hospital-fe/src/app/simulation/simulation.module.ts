import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'
import { ControlPanelComponent } from './components/control-panel/control-panel.component'
import { PanelListComponent } from './components/panel-list/panel-list.component'

const components = [ControlPanelComponent, PanelListComponent]

@NgModule({
  imports: [SharedModule],
  declarations: [...components],
  exports: [...components],
})
export class SimulationModule {}
