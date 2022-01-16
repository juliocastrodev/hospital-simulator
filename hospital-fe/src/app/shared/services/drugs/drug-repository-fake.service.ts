import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Drug } from '../../domain/drugs/Drug'
import { DrugRepository } from '../../domain/drugs/DrugRepository'

@Injectable()
export class DrugRepositoryFakeService implements DrugRepository {
  repository: Drug[] = ['I', 'As']

  private drugs$$ = new BehaviorSubject<Drug[]>([])

  fetch() {
    return of([...this.repository]).pipe(tap((drugs) => this.drugs$$.next(drugs)))
  }

  getAll() {
    return this.drugs$$
  }
}
