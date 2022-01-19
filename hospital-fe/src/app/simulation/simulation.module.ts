import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { DrugRepositoryModule } from './services/drug-repository/drug-repository.module'
import { PatientRepositoryModule } from './services/patient-repository/patient-repository.module'
import { SharedModule } from '../shared/shared.module'
import { ControlPanelComponent } from './components/control-panel/control-panel.component'
import { PanelListComponent } from './components/panel-list/panel-list.component'
import { I18NModule } from '../config/i18n.module'

@NgModule({
  imports: [SharedModule, DrugRepositoryModule, PatientRepositoryModule, BrowserModule, I18NModule],
  declarations: [ControlPanelComponent, PanelListComponent],
  exports: [ControlPanelComponent],
})
export class SimulationModule {}
