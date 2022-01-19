import { TranslateModule } from '@ngx-translate/core'
import { render } from '@testing-library/angular'
import { screen } from '@testing-library/dom'
import { DrugSimulator } from '../../../shared/domain/DrugSimulator'
import { SimulationRegister } from '../../../shared/domain/SimulationRegister'
import { DrugSimulatorFakeService } from '../../../shared/services/drug-simulator/drug-simulator-fake.service'
import { SharedModule } from '../../../shared/shared.module'
import { DRUGS } from '../../../utils/fixtures/drugs'
import { PATIENTS_REGISTER } from '../../../utils/fixtures/patients'
import { TODAY } from '../../../utils/fixtures/simulations'
import { SimulationRegisterComponent } from '../simulation-register/simulation-register.component'
import { HistoryComponent } from './history.component'

describe('HistoryComponent', () => {
  let drugsSimulator: DrugSimulatorFakeService

  beforeEach(() => {
    drugsSimulator = new DrugSimulatorFakeService()
  })

  const renderHistory = () =>
    render(HistoryComponent, {
      declarations: [SimulationRegisterComponent],
      imports: [SharedModule, TranslateModule.forRoot()],
      providers: [{ provide: DrugSimulator, useValue: drugsSimulator }],
    })

  describe('when history is clean', () => {
    beforeEach(() => {
      drugsSimulator.cleanHistory()
    })

    it('displays empty state', async () => {
      await renderHistory()

      expect(screen.getByText('VISUALIZATION.HISTORY.TITLE')).toBeInTheDocument()
      expect(screen.getByText('VISUALIZATION.HISTORY.EMPTY')).toBeInTheDocument()
    })
  })

  describe('when there are simulations in the history', () => {
    it("doesn't display empty state", async () => {
      await renderHistory()

      expect(screen.getByText('VISUALIZATION.HISTORY.TITLE')).toBeInTheDocument()
      expect(screen.queryByText('VISUALIZATION.HISTORY.EMPTY')).not.toBeInTheDocument()
    })

    it('displays each of them', async () => {
      await renderHistory()

      drugsSimulator
        .getRegisters()
        .forEach((register) => expect(screen.getByText(register.id)).toBeInTheDocument())
    })

    describe('and a new simulation occurs', () => {
      let newSimulation: SimulationRegister

      beforeEach(() => {
        newSimulation = new SimulationRegister({ ...TODAY, id: 'newSimulation' })
        drugsSimulator.setNextSimulationResult(newSimulation)
        drugsSimulator.simulate(PATIENTS_REGISTER, DRUGS)
      })

      it('displays the new simulation', async () => {
        await renderHistory()

        expect(screen.getByText('newSimulation')).toBeInTheDocument()
      })
    })
  })
})
