import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { I18NModule } from '../config/i18n.module'
import { DrugSimulatorModule } from '../shared/services/drug-simulator/drug-simulator.module'
import { SharedModule } from '../shared/shared.module'
import { HistoryComponent } from './components/history/history.component'
import { SimulationRegisterComponent } from './components/simulation-register/simulation-register.component'

@NgModule({
  imports: [SharedModule, BrowserModule, I18NModule, DrugSimulatorModule],
  declarations: [HistoryComponent, SimulationRegisterComponent],
  exports: [HistoryComponent],
})
export class VisualizationModule {}
