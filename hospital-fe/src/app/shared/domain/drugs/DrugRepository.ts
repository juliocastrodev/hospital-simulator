import { Observable } from 'rxjs'
import { Drug } from './Drug'

export abstract class DrugRepository {
  abstract fetch(): Observable<Drug[]>
  abstract getAll(): Observable<Drug[]>
}
