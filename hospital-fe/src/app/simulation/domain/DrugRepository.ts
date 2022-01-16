import { Observable } from 'rxjs'
import { Drug } from '../../shared/domain/Drug'

export abstract class DrugRepository {
  abstract fetch(): void
  abstract getAll(): Observable<Drug[]>
}
