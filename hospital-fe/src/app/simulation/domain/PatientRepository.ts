import { Observable } from 'rxjs'
import { PatientsRegister } from '../../shared/domain/PatientsRegister'

export abstract class PatientRepository {
  abstract fetchPatientsRegister(): void
  abstract getPatientsRegister(): Observable<PatientsRegister>
}
