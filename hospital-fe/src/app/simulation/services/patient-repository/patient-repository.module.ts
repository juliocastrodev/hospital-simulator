import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { PatientRepository } from '../../domain/PatientRepository'
import { PatientRepositoryApiService } from './patient-repository-api.service'

@NgModule({
  imports: [HttpClientModule],
  providers: [
    {
      provide: PatientRepository,
      useClass: PatientRepositoryApiService,
    },
  ],
})
export class PatientRepositoryModule {}
