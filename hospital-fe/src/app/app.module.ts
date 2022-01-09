import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { SharedModule } from './shared/shared.module'
import { SimulationModule } from './simulation/simulation.module'
import { VisualizationModule } from './visualization/visualization.module'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SharedModule, SimulationModule, VisualizationModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
