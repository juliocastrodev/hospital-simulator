import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { DrugRepository } from '../../domain/DrugRepository'
import { DrugRepositoryApiService } from './drug-repository-api.service'

@NgModule({
  imports: [HttpClientModule],
  providers: [
    {
      provide: DrugRepository,
      useClass: DrugRepositoryApiService,
    },
  ],
})
export class DrugRepositoryModule {}
