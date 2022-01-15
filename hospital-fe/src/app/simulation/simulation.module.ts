import { NgModule } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { SharedModule } from '../shared/shared.module'
import { ControlPanelComponent } from './components/control-panel/control-panel.component'
import { PanelListComponent } from './components/panel-list/panel-list.component'

const components = [ControlPanelComponent, PanelListComponent]

@NgModule({
  imports: [SharedModule, TranslateModule],
  declarations: [...components],
  exports: [...components],
})
export class SimulationModule {}
