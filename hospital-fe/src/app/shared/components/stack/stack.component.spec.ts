import { render } from '@testing-library/angular'
import { StackComponent } from './stack.component'

describe('StackComponent', () => {
  describe('when no props are provided', () => {
    it('includes default classes: direction-horizontal, justify-spaced and align-center', async () => {
      const { container } = await render(StackComponent)

      expect(container).toHaveClass('direction-horizontal', 'justify-spaced', 'align-center')
    })
  })

  describe('when props are provided', () => {
    describe('and we want to allow wrapping', () => {
      it('includes the wrap class', async () => {
        const { container } = await render(StackComponent, {
          componentProperties: { allowWrap: true },
        })

        expect(container).toHaveClass('wrap')
      })
    })

    describe('and we want to specify elements direction', () => {
      it('includes the corresponding direction class', async () => {
        const { container } = await render(StackComponent, {
          componentProperties: { direction: 'VERTICAL' },
        })

        expect(container).toHaveClass('direction-vertical')
      })
    })

    describe('and we want to specify elements justification', () => {
      it('includes the corresponding justification class', async () => {
        const { container } = await render(StackComponent, {
          componentProperties: { justify: 'STRETCHED' },
        })

        expect(container).toHaveClass('justify-stretched')
      })
    })

    describe('and we want to specify elements alignment', () => {
      it('includes the corresponding alignment class', async () => {
        const { container } = await render(StackComponent, {
          componentProperties: { align: 'END' },
        })

        expect(container).toHaveClass('align-end')
      })
    })

    describe('and we specify multiple options', () => {
      it('includes corresponding classes', async () => {
        const { container } = await render(StackComponent, {
          componentProperties: {
            allowWrap: true,
            align: 'END',
            direction: 'VERTICAL',
          },
        })

        expect(container).toHaveClass('wrap', 'align-end', 'direction-vertical')
      })
    })
  })
})
