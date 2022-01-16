import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { TranslateModule } from '@ngx-translate/core'
import { DrugRepositoryModule } from '../shared/services/drug-repository/drug-repository.module'
import { PatientRepositoryModule } from '../shared/services/patient-repository/patient-repository.module'
import { SharedModule } from '../shared/shared.module'
import { ControlPanelComponent } from './components/control-panel/control-panel.component'
import { PanelListComponent } from './components/panel-list/panel-list.component'

@NgModule({
  imports: [
    SharedModule,
    TranslateModule,
    DrugRepositoryModule,
    PatientRepositoryModule,
    BrowserModule,
  ],
  declarations: [ControlPanelComponent, PanelListComponent],
  exports: [ControlPanelComponent],
})
export class SimulationModule {}
