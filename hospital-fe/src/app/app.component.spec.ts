import { TranslateModule } from '@ngx-translate/core'
import { render } from '@testing-library/angular'
import { fireEvent, screen } from '@testing-library/dom'
import { AppComponent } from './app.component'
import { DrugSimulator } from './shared/domain/DrugSimulator'
import { DrugSimulatorFakeService } from './shared/services/drug-simulator/drug-simulator-fake.service'
import { SharedModule } from './shared/shared.module'
import { DrugRepository } from './simulation/domain/DrugRepository'
import { PatientRepository } from './simulation/domain/PatientRepository'
import { DrugRepositoryFakeService } from './simulation/services/drug-repository/drug-repository-fake.service'
import { PatientRepositoryFakeService } from './simulation/services/patient-repository/patient-repository-fake.service'
import { SimulationModule } from './simulation/simulation.module'
import { JANUARY_FIRST } from './utils/fixtures/simulations'
import { VisualizationModule } from './visualization/visualization.module'

describe('AppComponent', () => {
  let drugsSimulator: DrugSimulatorFakeService
  let drugsRepository: DrugRepositoryFakeService
  let patientsRepository: PatientRepositoryFakeService

  beforeEach(() => {
    drugsSimulator = new DrugSimulatorFakeService()
    drugsRepository = new DrugRepositoryFakeService()
    patientsRepository = new PatientRepositoryFakeService()

    drugsSimulator.cleanHistory()
  })

  const renderApp = () =>
    render(AppComponent, {
      imports: [SharedModule, VisualizationModule, SimulationModule, TranslateModule.forRoot()],
      providers: [
        { provide: DrugSimulator, useValue: drugsSimulator },
        { provide: DrugRepository, useValue: drugsRepository },
        { provide: PatientRepository, useValue: patientsRepository },
      ],
    })

  describe('when opening the app for the first time', () => {
    it('displays all sections, having the history empty', async () => {
      await renderApp()

      expect(screen.getByText('APP.TITLE')).toBeInTheDocument()
      expect(screen.getByText('SIMULATION.CONTROL_PANEL.TITLE')).toBeInTheDocument()
      expect(screen.getByText('VISUALIZATION.HISTORY.TITLE')).toBeInTheDocument()
      expect(screen.getByText('VISUALIZATION.HISTORY.EMPTY')).toBeInTheDocument()
      expect(screen.getByText('APP.FOOTER')).toBeInTheDocument()
    })
  })

  describe('when clicking on simulate button', () => {
    beforeEach(() => {
      drugsSimulator.setNextSimulationResult({ ...JANUARY_FIRST, id: 'newSimulation' })
    })

    it('displays the simulation in the history', async () => {
      await renderApp()

      fireEvent.click(screen.getByText('SIMULATION.CONTROL_PANEL.BUTTON'))

      expect(screen.queryByText('VISUALIZATION.HISTORY.EMPTY')).not.toBeInTheDocument()
      expect(screen.getByText('newSimulation')).toBeInTheDocument()
    })
  })
})
