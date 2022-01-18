import { render } from '@testing-library/angular'
import { screen } from '@testing-library/dom'
import { CardComponent } from './card.component'

describe('CardComponent', () => {
  it('projects its content', async () => {
    await render(
      `
    <app-card>
      <header>Header</header>
      <main>Main</main>
      <footer>Footer</footer>
    </app-card>
    `,
      { declarations: [CardComponent] }
    )

    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Main')).toBeInTheDocument()
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })

  describe('when no props are provided', () => {
    it('includes no classes', async () => {
      const { container } = await render(CardComponent)

      expect(container.classList).toHaveLength(0)
    })
  })

  describe('when props are provided', () => {
    describe('and we want to add shadow', () => {
      it('includes the shadow class', async () => {
        const { container } = await render(CardComponent, {
          componentProperties: { hasShadow: true },
        })

        expect(container).toHaveClass('shadow')
      })
    })
  })
})
