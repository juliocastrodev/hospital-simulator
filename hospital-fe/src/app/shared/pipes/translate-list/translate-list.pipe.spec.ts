import { TranslateListPipe } from './translate-list.pipe'
import { TestBed } from '@angular/core/testing'
import { ChangeDetectorRef } from '@angular/core'
import { TranslatePipe, TranslateService } from '@ngx-translate/core'

describe('TranslateListPipe', () => {
  let pipe: TranslateListPipe

  beforeEach(() => {
    jest.clearAllMocks()

    TestBed.configureTestingModule({
      providers: [
        TranslateListPipe,
        { provide: TranslateService, useValue: {} },
        { provide: ChangeDetectorRef, useValue: {} },
      ],
    })

    pipe = TestBed.inject(TranslateListPipe)
  })

  describe('when input is not an array', () => {
    it('throws an error', () => {
      expect(() => pipe.transform({ fail: true })).toThrow(
        'translateList pipe can only be used with arrays'
      )
    })
  })

  describe('when input is an array', () => {
    jest
      .spyOn(TranslatePipe.prototype, 'transform')
      .mockImplementation((key) => `TRANSLATED:${key}`)

    it('maps each element to its translated version', () => {
      const input = [1, 'one', { one: 1 }, true, [1, 2, 3, 4]]

      const output = pipe.transform(input)

      expect(output).toEqual([
        'TRANSLATED:1',
        'TRANSLATED:one',
        'TRANSLATED:[object Object]',
        'TRANSLATED:true',
        'TRANSLATED:1,2,3,4',
      ])
    })
  })
})
