import { TranslateModule } from '@ngx-translate/core'
import { render, RenderComponentOptions } from '@testing-library/angular'
import { ListComponent } from './list.component'

describe('ListComponent', () => {
  const renderList = async (options?: RenderComponentOptions<ListComponent>) =>
    await render(ListComponent, {
      imports: [TranslateModule.forRoot()],
      ...options,
    })

  describe('when no props are provided', () => {
    it('includes default classes: bullet', async () => {
      const { container } = await renderList()

      expect(container).toHaveClass('bullet')
    })

    it('shows empty state', async () => {
      const { getByText } = await renderList()

      expect(getByText('LIST.EMPTY')).toBeInTheDocument()
    })
  })

  describe('when props are provided', () => {
    describe('and we specify the type', () => {
      it('includes the corresponding type class', async () => {
        const { container } = await renderList({ componentProperties: { type: 'INLINE' } })

        expect(container).toHaveClass('inline')
      })
    })

    describe('and we specify the items', () => {
      describe('and it is an empty list', () => {
        it('shows empty state', async () => {
          const { getByText } = await renderList({ componentProperties: { items: [] } })

          expect(getByText('LIST.EMPTY')).toBeInTheDocument()
        })
      })

      describe('and there are actually elements', () => {
        it('shows each element in the list', async () => {
          const { getByText } = await renderList({
            componentProperties: {
              items: [
                { primary: 'A primary', secondary: 'A secondary' },
                { primary: 'B primary' },
                { primary: 'C primary', secondary: 'C secondary' },
              ],
            },
          })

          expect(getByText('A primary')).toBeInTheDocument()
          expect(getByText('A secondary')).toBeInTheDocument()
          expect(getByText('B primary')).toBeInTheDocument()
          expect(getByText('C primary')).toBeInTheDocument()
          expect(getByText('C secondary')).toBeInTheDocument()
        })
      })
    })
  })
})
