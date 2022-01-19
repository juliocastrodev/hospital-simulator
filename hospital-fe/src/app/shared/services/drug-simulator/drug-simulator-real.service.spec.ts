import { Quarantine } from 'hospital-lib'
import { Subscription } from 'rxjs'
import { DRUGS, ONLY_PARACETAMOL } from '../../../utils/fixtures/drugs'
import { ALL_HEALTHY, PATIENTS_REGISTER } from '../../../utils/fixtures/patients'
import { DrugSimulator } from '../../domain/DrugSimulator'
import { SimulationRegister } from '../../domain/SimulationRegister'
import { DrugSimulatorRealService } from './drug-simulator-real.service'

describe('DrugSimulatorRealService', () => {
  let service: DrugSimulatorRealService

  beforeEach(() => {
    jest.useFakeTimers()
    service = new DrugSimulatorRealService()
  })

  describe('getHistory', () => {
    let history: SimulationRegister[]
    let subscription: Subscription

    beforeEach(() => {
      subscription = new Subscription()

      subscription.add(service.getHistory().subscribe((h) => (history = h)))
    })

    afterEach(() => subscription.unsubscribe())

    describe('when no simulation happens', () => {
      it('keeps history empty', () => {
        jest.runAllTimers()

        expect(history).toEqual([])
      })
    })

    describe('when simulation happens', () => {
      describe('and history is empty', () => {
        it('adds the register to the history', () => {
          const result = service.simulate({}, [])
          jest.runAllTimers()

          expect(history).toEqual([result])
        })
      })

      describe('and history is not empty but not complete', () => {
        let currentHistory: SimulationRegister[]

        beforeEach(() => {
          currentHistory = []
          for (let i = 0; i < DrugSimulator.HISTORY_MAX_LENGTH - 2; i++)
            currentHistory.unshift(service.simulate({}, []))
        })

        it('adds the register to the history keeping all old registers', () => {
          const result = service.simulate({}, [])
          jest.runAllTimers()

          expect(history).toEqual([result, ...currentHistory])
        })
      })

      describe('and history is complete', () => {
        let currentHistory: SimulationRegister[]

        beforeEach(() => {
          currentHistory = []
          for (let i = 0; i < DrugSimulator.HISTORY_MAX_LENGTH; i++)
            currentHistory.unshift(service.simulate({}, []))
        })

        it('adds the register to the history removing oldest one', () => {
          const result = service.simulate({}, [])
          jest.runAllTimers()

          expect(history).toEqual([
            result,
            ...currentHistory.slice(0, DrugSimulator.HISTORY_MAX_LENGTH - 1),
          ])
        })
      })
    })
  })

  describe('simulate', () => {
    it('creates a new register with simulation results, a random id and current date', () => {
      const currentDate = new Date('2022/01/10')
      jest.setSystemTime(currentDate)

      const result = service.simulate(PATIENTS_REGISTER, ONLY_PARACETAMOL)

      expect(result).toEqual({
        id: expect.any(String),
        date: currentDate,
        patients: PATIENTS_REGISTER,
        drugs: ONLY_PARACETAMOL,
        results: expect.any(Object),
      })
    })

    it('uses hospital-lib with correct params', () => {
      const setDrugsSpy = jest.spyOn(Quarantine.prototype, 'setDrugs')
      const wait40DaysSpy = jest.spyOn(Quarantine.prototype, 'wait40Days')
      const reportSpy = jest.spyOn(Quarantine.prototype, 'report').mockReturnValue(ALL_HEALTHY)

      const output = service.simulate(PATIENTS_REGISTER, DRUGS)

      expect(setDrugsSpy).toHaveBeenCalledWith(DRUGS)
      expect(wait40DaysSpy).toHaveBeenCalled()
      expect(reportSpy).toHaveBeenCalled()
      expect(output.results).toEqual(ALL_HEALTHY)
    })
  })
})
