import { Observable } from 'rxjs'
import { PatientsRegister } from './PatientsRegister'

export abstract class PatientRepository {
  abstract fetchPatientsRegister(): Observable<PatientsRegister>
  abstract getPatientsRegister(): Observable<PatientsRegister>
}
