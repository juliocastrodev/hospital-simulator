import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { Drug } from '../../domain/drugs/Drug'
import { DrugRepository } from '../../domain/drugs/DrugRepository'
import { environment } from '../../../../environments/environment'

// The number of drugs is indeterminate
type DrugsResponse = `${Drug},${Drug}` | ''

@Injectable()
export class DrugRepositoryApiService implements DrugRepository {
  private drugs$$ = new BehaviorSubject<Drug[]>([])

  constructor(private readonly http: HttpClient) {}

  fetch() {
    const { baseUrl } = environment

    return this.http.get<DrugsResponse>(`${baseUrl}/drugs`).pipe(
      map((response) => {
        if (response === '') return []

        return response.split(',').map((drugCode) => drugCode.trim() as Drug)
      }),
      tap((drugs) => this.drugs$$.next(drugs))
    )
  }

  getAll() {
    return this.drugs$$
  }
}
