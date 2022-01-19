import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Drug } from '../../../shared/domain/Drug'
import { DRUGS } from '../../../utils/fixtures/drugs'
import { DrugRepository } from '../../domain/DrugRepository'

@Injectable()
export class DrugRepositoryFakeService implements DrugRepository {
  private drugs$$ = new BehaviorSubject<Drug[]>(DRUGS)

  private nextDrugs?: Drug[]

  fetch() {
    const nextDrugs = this.nextDrugs ?? this.drugs$$.getValue()

    this.drugs$$.next(nextDrugs)
  }

  getAll() {
    return this.drugs$$
  }

  cleanDrugs() {
    this.drugs$$.next([])
  }

  setNextDrugs(drugs: Drug[]) {
    this.nextDrugs = drugs
  }
}
