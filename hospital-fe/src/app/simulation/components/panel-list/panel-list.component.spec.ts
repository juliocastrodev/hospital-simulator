import { EventEmitter } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { render, RenderComponentOptions } from '@testing-library/angular'
import { screen, fireEvent } from '@testing-library/dom'
import { SharedModule } from '../../../shared/shared.module'
import { PanelListComponent } from './panel-list.component'

describe('PanelListComponent', () => {
  const renderPanelList = (options?: RenderComponentOptions<PanelListComponent>) =>
    render(PanelListComponent, {
      imports: [SharedModule, TranslateModule.forRoot()],
      ...options,
    })

  describe('when no props are provided', () => {
    it('shows the empty list state', async () => {
      await renderPanelList()

      expect(screen.getByText('LIST.EMPTY')).toBeInTheDocument()
    })
  })

  describe('when props are provided', () => {
    describe('and specifying title, items and button fields', () => {
      it('displays them all', async () => {
        await renderPanelList({
          componentProperties: {
            title: 'Title',
            items: [
              { primary: 'A first' },
              { primary: 'B first', secondary: 'B second' },
              { primary: 'C first', secondary: 'C second' },
            ],
            button: 'button',
          },
        })

        expect(screen.getByText('Title')).toBeInTheDocument()
        expect(screen.getByText('A first')).toBeInTheDocument()
        expect(screen.getByText('B first')).toBeInTheDocument()
        expect(screen.getByText('B second')).toBeInTheDocument()
        expect(screen.getByText('C first')).toBeInTheDocument()
        expect(screen.getByText('C second')).toBeInTheDocument()
        expect(screen.getByText('button')).toBeInTheDocument()
      })
    })
  })

  describe('when clicking on the button', () => {
    const clickSpy = { emit: jest.fn() } as unknown as EventEmitter<void>

    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('emits the clicked event', async () => {
      await renderPanelList({ componentProperties: { buttonclick: clickSpy, button: 'Click me' } })

      fireEvent.click(screen.getByText('Click me'))

      expect(clickSpy.emit).toHaveBeenCalled()
    })
  })
})
