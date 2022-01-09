import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'
import { HistoryComponent } from './components/history/history.component'

const components = [HistoryComponent]

@NgModule({
  imports: [SharedModule],
  declarations: [...components],
  exports: [...components],
})
export class VisualizationModule {}
