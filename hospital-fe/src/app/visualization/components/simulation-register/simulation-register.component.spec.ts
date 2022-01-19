/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { DatePipe } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { render, RenderComponentOptions } from '@testing-library/angular'
import { screen, within } from '@testing-library/dom'
import { SimulationRegister } from '../../../shared/domain/SimulationRegister'
import { SharedModule } from '../../../shared/shared.module'
import { JANUARY_FIRST } from '../../../utils/fixtures/simulations'
import { SimulationRegisterComponent } from './simulation-register.component'

describe('SimulationRegisterComponent', () => {
  const renderComp = (options?: RenderComponentOptions<SimulationRegisterComponent>) =>
    render(SimulationRegisterComponent, {
      imports: [SharedModule, TranslateModule.forRoot()],
      ...options,
    })

  describe('when no register is provided', () => {
    it("doesn't render", async () => {
      expect(() => renderComp()).rejects.toThrow()
    })
  })

  describe('when a simulation register is provided', () => {
    it('displays the 3 sections of the register: patients, drugs and results', async () => {
      await renderComp({ componentProperties: { register: JANUARY_FIRST } })

      expectIdentifierSectionIsDisplayed(JANUARY_FIRST)
      expectPatientsSectionIsDisplayed(JANUARY_FIRST)
      expectDrugsSectionIsDisplayed(JANUARY_FIRST)
      expectResultsSectionIsDisplayed(JANUARY_FIRST)
    })

    const expectIdentifierSectionIsDisplayed = (register: SimulationRegister) => {
      expect(screen.getByText(register.id)).toBeInTheDocument()

      expect(
        screen.getByText(new DatePipe('en-US').transform(register.date, 'short')!)
      ).toBeInTheDocument()
    }

    const expectPatientsSectionIsDisplayed = (register: SimulationRegister) => {
      const patientsSection = screen.getByText('VISUALIZATION.SIMULATION_REGISTER.PATIENTS.TITLE')
        .parentElement!

      Object.entries(register.patients).forEach(([patientState, count]) => {
        expect(
          within(patientsSection).getByText(`PATIENTS.${patientState.toUpperCase()}`)
        ).toBeInTheDocument()
        expect(within(patientsSection).getAllByText(count)[0]).toBeInTheDocument()
      })
    }

    const expectDrugsSectionIsDisplayed = (register: SimulationRegister) => {
      const drugsSection = screen.getByText('VISUALIZATION.SIMULATION_REGISTER.DRUGS.TITLE')
        .parentElement!

      register.drugs.forEach((drug) =>
        expect(within(drugsSection).getByText(`DRUGS.${drug.toUpperCase()}`)).toBeInTheDocument()
      )
    }

    const expectResultsSectionIsDisplayed = (register: SimulationRegister) => {
      const resultsSection = screen.getByText('VISUALIZATION.SIMULATION_REGISTER.RESULTS.TITLE')
        .parentElement!

      Object.entries(register.results).forEach(([patientState, count]) => {
        expect(
          within(resultsSection).getByText(`PATIENTS.${patientState.toUpperCase()}`)
        ).toBeInTheDocument()
        expect(within(resultsSection).getAllByText(count)[0]).toBeInTheDocument()
      })
    }
  })
})
