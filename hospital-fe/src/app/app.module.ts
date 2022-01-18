import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { I18NModule } from './config/i18n.module'
import { SharedModule } from './shared/shared.module'
import { SimulationModule } from './simulation/simulation.module'
import { VisualizationModule } from './visualization/visualization.module'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SharedModule, SimulationModule, VisualizationModule, I18NModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
