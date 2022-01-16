import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Drug } from '../../../shared/domain/Drug'
import { DRUGS } from '../../../utils/fixtures/drugs'
import { DrugRepository } from '../../domain/DrugRepository'

@Injectable()
export class DrugRepositoryFakeService implements DrugRepository {
  private drugs$$ = new BehaviorSubject<Drug[]>(DRUGS)

  fetch() {
    return this.drugs$$
  }

  getAll() {
    return this.drugs$$
  }
}
