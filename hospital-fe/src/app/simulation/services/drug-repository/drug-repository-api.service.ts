import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { map, share, switchMap } from 'rxjs/operators'
import { Drug } from '../../../shared/domain/Drug'
import { DrugRepository } from '../../domain/DrugRepository'
import { environment } from '../../../../environments/environment'

// The number of drugs is indeterminate
type DrugsResponse = `${Drug},${Drug}` | ''

@Injectable()
export class DrugRepositoryApiService implements DrugRepository {
  constructor(private readonly http: HttpClient) {}

  private triggerFetchDrugs$$ = new BehaviorSubject<void>(undefined)

  private fetchDrugs$ = this.triggerFetchDrugs$$.pipe(
    switchMap(() => this.http.get<DrugsResponse>(`${environment.baseUrl}/drugs`)),
    map((response) => (response === '' ? [] : response.split(','))),
    share()
  )

  fetch() {
    this.triggerFetchDrugs$$.next()
  }

  getAll() {
    return this.fetchDrugs$
  }
}
