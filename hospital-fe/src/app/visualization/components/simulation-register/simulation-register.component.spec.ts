import { render } from '@testing-library/angular'
import { screen } from '@testing-library/dom'
import { I18NModule } from '../../../config/i18n.module'
import { CardComponent } from '../../../shared/components/card/card.component'
import { ListComponent } from '../../../shared/components/list/list.component'
import { StackComponent } from '../../../shared/components/stack/stack.component'
import { SharedModule } from '../../../shared/shared.module'
import { SIMULATIONS } from '../../../utils/fixtures/simulations'
import { SimulationRegisterComponent } from './simulation-register.component'

describe('SimulationRegisterComponent', () => {
  it('foo', async () => {
    await render(`<app-stack><div>what?</div></app-stack>`, {
      // declarations: [StackComponent, ListComponent, CardComponent],
      imports: [I18NModule, SharedModule],
      componentProperties: {
        register: SIMULATIONS[0],
      },
    })

    screen.debug()
  })
})
