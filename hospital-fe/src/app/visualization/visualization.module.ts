import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { TranslateModule } from '@ngx-translate/core'
import { SharedModule } from '../shared/shared.module'
import { HistoryComponent } from './components/history/history.component'
import { SimulationRegisterComponent } from './components/simulation-register/simulation-register.component'

@NgModule({
  imports: [SharedModule, BrowserModule, TranslateModule],
  declarations: [HistoryComponent, SimulationRegisterComponent],
  exports: [HistoryComponent],
})
export class VisualizationModule {}
