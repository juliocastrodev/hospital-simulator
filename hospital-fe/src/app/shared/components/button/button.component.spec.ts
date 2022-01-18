import { render } from '@testing-library/angular'
import { ButtonComponent } from './button.component'

describe('ButtonComponent', () => {
  it('projects its content in the button', async () => {
    const { container } = await render(
      `
    <app-button>
      Hello <strong>world</strong>
    </app-button>
    `,
      { declarations: [ButtonComponent] }
    )

    expect(container).toHaveTextContent('Hello world')
  })

  describe('when no props are provided', () => {
    it('includes in the button the default classes: primary', async () => {
      const { getByRole } = await render(ButtonComponent)

      expect(getByRole('button')).toHaveClass('primary')
    })
  })

  describe('when props are provided', () => {
    describe('and we specify the type of the button', () => {
      it('includes in the button the corresponding class', async () => {
        const { getByRole } = await render(ButtonComponent, {
          componentProperties: { type: 'SECONDARY' },
        })

        expect(getByRole('button')).toHaveClass('secondary')
      })
    })
  })
})
