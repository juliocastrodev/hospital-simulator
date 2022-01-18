import { ListItemPipe } from './list-item.pipe'

describe('ListItemPipe', () => {
  let pipe: ListItemPipe

  beforeEach(() => {
    pipe = new ListItemPipe()
  })

  describe('when input is an array', () => {
    describe('and array is empty', () => {
      it('returns empty array', () => {
        const output = pipe.transform([])

        expect(output).toEqual([])
      })
    })

    describe('and array is not empty', () => {
      it('puts the string representation in the primary field', () => {
        const output = pipe.transform([1, 'one', { one: 1 }, true, [1, 2, 3, 4]])

        expect(output).toEqual([
          { primary: '1' },
          { primary: 'one' },
          { primary: '[object Object]' },
          { primary: 'true' },
          { primary: '1,2,3,4' },
        ])
      })
    })
  })

  describe('when input is an object', () => {
    describe('and object is empty', () => {
      it('returns empty array', () => {
        const output = pipe.transform({})

        expect(output).toEqual([])
      })
    })

    describe('and object is not empty', () => {
      it('puts keys in primary field and the string representation of values in the secondary field', () => {
        const output = pipe.transform({
          number: 1,
          string: 'one',
          object: { one: 1 },
          boolean: true,
          array: [1, 2, 3, 4],
        })

        expect(output).toEqual([
          { primary: 'number', secondary: '1' },
          { primary: 'string', secondary: 'one' },
          { primary: 'object', secondary: '[object Object]' },
          { primary: 'boolean', secondary: 'true' },
          { primary: 'array', secondary: '1,2,3,4' },
        ])
      })
    })
  })
})
