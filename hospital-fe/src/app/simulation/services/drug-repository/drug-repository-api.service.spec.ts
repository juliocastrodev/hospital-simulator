import { HttpClient } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { of, Subscription } from 'rxjs'
import { DrugRepositoryApiService } from './drug-repository-api.service'

const mockHttp = {
  get: jest.fn().mockReturnValue(of()),
}

describe('DrugRepositoryApiService', () => {
  let service: DrugRepositoryApiService

  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()

    TestBed.configureTestingModule({
      providers: [DrugRepositoryApiService, { provide: HttpClient, useValue: mockHttp }],
    })

    service = TestBed.inject(DrugRepositoryApiService)
  })

  describe('when there are no subscribers', () => {
    describe('fetch', () => {
      it("doesn't trigger any http request", () => {
        service.fetch()
        service.fetch()
        service.fetch()
        service.fetch()
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

    describe('getAll', () => {
      it('triggers a single http request, regardless of the number of suscribers', () => {
        subscription.add(service.getAll().subscribe())
        subscription.add(service.getAll().subscribe())
        subscription.add(service.getAll().subscribe())

        expect(mockHttp.get).toHaveBeenCalledTimes(1)
      })

      describe('and the server responds with no drugs', () => {
        beforeEach(() => {
          mockHttp.get.mockReturnValue(of(''))
        })

        it('emits empty array', () => {
          let emitted

          subscription.add(service.getAll().subscribe((response) => (emitted = response)))
          jest.runAllTicks()

          expect(emitted).toEqual([])
        })
      })

      describe('and the server responds with drugs', () => {
        beforeEach(() => {
          mockHttp.get.mockReturnValue(of('As,I,P'))
        })

        it('emits the list of drugs', () => {
          let emitted

          subscription.add(service.getAll().subscribe((response) => (emitted = response)))
          jest.runAllTicks()

          expect(emitted).toEqual(['As', 'I', 'P'])
        })
      })
    })

    describe('fetch', () => {
      it('triggers a single http request every time it is called, regardless of the number of suscribers', async () => {
        subscription.add(service.getAll().subscribe())
        subscription.add(service.getAll().subscribe())
        subscription.add(service.getAll().subscribe())

        service.fetch()
        service.fetch()
        service.fetch()
        service.fetch()
        jest.runAllTimers()

        expect(mockHttp.get).toHaveBeenCalledTimes(1 + 4) // initial http request + 4 fetch calls
      })
    })
  })
})
