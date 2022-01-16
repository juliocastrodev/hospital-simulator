import { NgModule } from '@angular/core'
import { DrugSimulator } from '../../domain/DrugSimulator'
import { DrugSimulatorRealService } from './drug-simulator-real.service'

@NgModule({
  providers: [
    {
      provide: DrugSimulator,
      useClass: DrugSimulatorRealService,
    },
  ],
})
export class DrugSimulatorModule {}
