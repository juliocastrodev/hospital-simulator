import { HttpClient } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { of, Subscription } from 'rxjs'
import { PatientRepositoryApiService } from './patient-repository-api.service'

const mockHttp = {
  get: jest.fn().mockReturnValue(of()),
}

describe('PatientRepositoryApiService', () => {
  let service: PatientRepositoryApiService

  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()

    TestBed.configureTestingModule({
      providers: [PatientRepositoryApiService, { provide: HttpClient, useValue: mockHttp }],
    })

    service = TestBed.inject(PatientRepositoryApiService)
  })

  describe('when there are no subscribers', () => {
    describe('fetchPatientsRegister', () => {
      it("doesn't trigger any http request", () => {
        service.fetchPatientsRegister()
        service.fetchPatientsRegister()
        jest.runAllTimers()

        expect(mockHttp.get).not.toHaveBeenCalled()
      })
    })
  })

  describe('when there are subscribers', () => {
    let subscription: Subscription

    beforeEach(() => {
      subscription = new Subscription()
    })

    afterEach(() => {
      subscription.unsubscribe()
    })

    describe('getPatientsRegister', () => {
      it('triggers a single http request, regardless of the number of suscribers', () => {
        subscription.add(service.getPatientsRegister().subscribe())
        subscription.add(service.getPatientsRegister().subscribe())
        subscription.add(service.getPatientsRegister().subscribe())

        expect(mockHttp.get).toHaveBeenCalledTimes(1)
      })

      describe('and the server responds with no patients', () => {
        beforeEach(() => {
          mockHttp.get.mockReturnValue(of(''))
        })

        it('emits empty register', () => {
          let emitted

          subscription.add(
            service.getPatientsRegister().subscribe((response) => (emitted = response))
          )
          jest.runAllTicks()

          expect(emitted).toEqual({})
        })
      })

      describe('and the server responds with patients', () => {
        describe('and there are no repeated states', () => {
          beforeEach(() => {
            mockHttp.get.mockReturnValue(of('F,H,X'))
          })

          it('emits the register with count=1 for every patient state', () => {
            let emitted

            subscription.add(
              service.getPatientsRegister().subscribe((response) => (emitted = response))
            )
            jest.runAllTicks()

            expect(emitted).toEqual({ F: 1, H: 1, X: 1 })
          })
        })

        describe('and there are repeated states', () => {
          beforeEach(() => {
            mockHttp.get.mockReturnValue(of('D,F,F,F,X,X,H,F,D,X'))
          })

          it('emits the register counting the number of patients for each state', () => {
            let emitted

            subscription.add(
              service.getPatientsRegister().subscribe((response) => (emitted = response))
            )
            jest.runAllTicks()

            expect(emitted).toEqual({ D: 2, F: 4, X: 3, H: 1 })
          })
        })
      })
    })

    describe('fetchPatientsRegister', () => {
      it('triggers a http request every time it is called, regardless of the number of suscribers', async () => {
        subscription.add(service.getPatientsRegister().subscribe())
        subscription.add(service.getPatientsRegister().subscribe())
        subscription.add(service.getPatientsRegister().subscribe())

        service.fetchPatientsRegister()
        service.fetchPatientsRegister()
        jest.runAllTimers()

        expect(mockHttp.get).toHaveBeenCalledTimes(1 + 2) // initial http request + 2 fetch calls
      })
    })
  })
})
