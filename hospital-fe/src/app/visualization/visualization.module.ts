import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { SharedModule } from '../shared/shared.module'
import { HistoryComponent } from './components/history/history.component'
import { SimulationRegisterComponent } from './components/simulation-register/simulation-register.component'

const components = [HistoryComponent, SimulationRegisterComponent]

@NgModule({
  imports: [SharedModule, BrowserModule],
  declarations: [...components],
  exports: [...components],
})
export class VisualizationModule {}
