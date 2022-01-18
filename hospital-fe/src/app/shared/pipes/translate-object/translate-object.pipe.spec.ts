import { ChangeDetectorRef } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { TranslatePipe, TranslateService } from '@ngx-translate/core'
import { TranslateObjectPipe } from './translate-object.pipe'

describe('TranslateObjectPipe', () => {
  let pipe: TranslateObjectPipe

  beforeEach(() => {
    jest.clearAllMocks()

    TestBed.configureTestingModule({
      providers: [
        TranslateObjectPipe,
        { provide: TranslateService, useValue: {} },
        { provide: ChangeDetectorRef, useValue: {} },
      ],
    })

    pipe = TestBed.inject(TranslateObjectPipe)
  })

  describe('when input is not an object', () => {
    it('throws an error', () => {
      expect(() => pipe.transform('fail', 'ALL')).toThrow(
        'translateObject pipe can only be used with objects'
      )
    })
  })

  describe('when input is an object', () => {
    jest
      .spyOn(TranslatePipe.prototype, 'transform')
      .mockImplementation((key) => `TRANSLATED:${key}`)

    describe('and we are considering keys', () => {
      describe('and input is empty', () => {
        it('returns empty object', () => {
          const output = pipe.transform({}, 'KEYS')

          expect(output).toEqual({})
        })
      })

      describe('and input is not empty', () => {
        it('translates only object keys but transforms values to string representation', () => {
          const output = pipe.transform(
            { number: 1, string: 'one', object: { one: 1 }, boolean: true, array: [1, 2, 3, 4] },
            'KEYS'
          )

          expect(output).toEqual({
            'TRANSLATED:number': '1',
            'TRANSLATED:string': 'one',
            'TRANSLATED:object': '[object Object]',
            'TRANSLATED:boolean': 'true',
            'TRANSLATED:array': '1,2,3,4',
          })
        })
      })
    })

    describe('and we are considering values', () => {
      describe('and input is empty', () => {
        it('returns empty object', () => {
          const output = pipe.transform({}, 'VALUES')

          expect(output).toEqual({})
        })
      })

      describe('and input is not empty', () => {
        it('translates only object values', () => {
          const output = pipe.transform(
            { number: 1, string: 'one', object: { one: 1 }, boolean: true, array: [1, 2, 3, 4] },
            'VALUES'
          )

          expect(output).toEqual({
            number: 'TRANSLATED:1',
            string: 'TRANSLATED:one',
            object: 'TRANSLATED:[object Object]',
            boolean: 'TRANSLATED:true',
            array: 'TRANSLATED:1,2,3,4',
          })
        })
      })
    })

    describe('and we are considering all fields', () => {
      describe('and input is empty', () => {
        it('returns empty object', () => {
          const output = pipe.transform({}, 'ALL')

          expect(output).toEqual({})
        })
      })

      describe('and input is not empty', () => {
        it('translates both keys and values', () => {
          const output = pipe.transform(
            { number: 1, string: 'one', object: { one: 1 }, boolean: true, array: [1, 2, 3, 4] },
            'ALL'
          )

          expect(output).toEqual({
            'TRANSLATED:number': 'TRANSLATED:1',
            'TRANSLATED:string': 'TRANSLATED:one',
            'TRANSLATED:object': 'TRANSLATED:[object Object]',
            'TRANSLATED:boolean': 'TRANSLATED:true',
            'TRANSLATED:array': 'TRANSLATED:1,2,3,4',
          })
        })
      })
    })
  })
})
