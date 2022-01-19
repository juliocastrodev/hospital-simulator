/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { TranslateModule } from '@ngx-translate/core'
import { render } from '@testing-library/angular'
import { fireEvent, screen, within } from '@testing-library/dom'
import { DrugSimulator } from '../../../shared/domain/DrugSimulator'
import { DrugSimulatorFakeService } from '../../../shared/services/drug-simulator/drug-simulator-fake.service'
import { SharedModule } from '../../../shared/shared.module'
import { ONLY_PARACETAMOL } from '../../../utils/fixtures/drugs'
import { ALL_HEALTHY } from '../../../utils/fixtures/patients'
import { DrugRepository } from '../../domain/DrugRepository'
import { PatientRepository } from '../../domain/PatientRepository'
import { DrugRepositoryFakeService } from '../../services/drug-repository/drug-repository-fake.service'
import { PatientRepositoryFakeService } from '../../services/patient-repository/patient-repository-fake.service'
import { PanelListComponent } from '../panel-list/panel-list.component'
import { ControlPanelComponent } from './control-panel.component'

describe('ControlPanelComponent', () => {
  let drugsSimulator: DrugSimulatorFakeService
  let drugsRepository: DrugRepositoryFakeService
  let patientsRepository: PatientRepositoryFakeService

  beforeEach(() => {
    drugsSimulator = new DrugSimulatorFakeService()
    drugsRepository = new DrugRepositoryFakeService()
    patientsRepository = new PatientRepositoryFakeService()
  })

  const renderControlPanel = () =>
    render(ControlPanelComponent, {
      declarations: [PanelListComponent],
      imports: [SharedModule, TranslateModule.forRoot()],
      providers: [
        { provide: DrugSimulator, useValue: drugsSimulator },
        { provide: DrugRepository, useValue: drugsRepository },
        { provide: PatientRepository, useValue: patientsRepository },
      ],
    })

  const patientsSection = () =>
    screen.getByText('SIMULATION.CONTROL_PANEL.PATIENTS.TITLE').parentElement!

  const drugsSection = () => screen.getByText('SIMULATION.CONTROL_PANEL.DRUGS.TITLE').parentElement!

  describe('when there are no patients', () => {
    beforeEach(() => {
      patientsRepository.cleanPatientsRegister()
    })

    it('shows empty list in patients section', async () => {
      await renderControlPanel()

      expect(within(patientsSection()).getByText('LIST.EMPTY')).toBeInTheDocument()
    })
  })

  describe('when there are no drugs', () => {
    beforeEach(() => {
      drugsRepository.cleanDrugs()
    })

    it('shows empty list in drugs section', async () => {
      await renderControlPanel()

      expect(within(drugsSection()).getByText('LIST.EMPTY')).toBeInTheDocument()
    })
  })

  describe('when clicking on patients button', () => {
    it('triggers a fetch patients register call and updates the list', async () => {
      patientsRepository.setNextPatientsRegister(ALL_HEALTHY)
      const fetchSpy = jest.spyOn(patientsRepository, 'fetchPatientsRegister')
      await renderControlPanel()

      fireEvent.click(screen.getByText('SIMULATION.CONTROL_PANEL.PATIENTS.BUTTON'))

      expect(fetchSpy).toHaveBeenCalled()
      Object.entries(ALL_HEALTHY).forEach(([patientState, count]) => {
        expect(within(patientsSection()).getByText(`PATIENTS.${patientState}`)).toBeInTheDocument()
        expect(within(patientsSection()).getAllByText(count)[0]).toBeInTheDocument()
      })
    })
  })

  describe('when clicking on drugs button', () => {
    it('triggers a fetch drugs call and updates the list', async () => {
      drugsRepository.setNextDrugs(ONLY_PARACETAMOL)
      const fetchSpy = jest.spyOn(drugsRepository, 'fetch')
      await renderControlPanel()

      fireEvent.click(screen.getByText('SIMULATION.CONTROL_PANEL.DRUGS.BUTTON'))

      expect(fetchSpy).toHaveBeenCalled()
      ONLY_PARACETAMOL.forEach((drug) =>
        expect(within(drugsSection()).getByText(`DRUGS.${drug}`)).toBeInTheDocument()
      )
    })
  })

  describe('when clicking on simulate button', () => {
    it('calls simulate service with current patients register and drugs', async () => {
      const simulateSpy = jest.spyOn(drugsSimulator, 'simulate')
      patientsRepository.setNextPatientsRegister(ALL_HEALTHY)
      drugsRepository.setNextDrugs(ONLY_PARACETAMOL)
      await renderControlPanel()
      fireEvent.click(screen.getByText('SIMULATION.CONTROL_PANEL.PATIENTS.BUTTON'))
      fireEvent.click(screen.getByText('SIMULATION.CONTROL_PANEL.DRUGS.BUTTON'))

      fireEvent.click(screen.getByText('SIMULATION.CONTROL_PANEL.BUTTON'))

      expect(simulateSpy).toHaveBeenCalledWith(ALL_HEALTHY, ONLY_PARACETAMOL)
    })
  })
})
