import { TranslateIdPipe } from '../translate-id/translate-id.pipe'
import { ObjectTranslateIdsPipe } from './object-translate-ids.pipe'

type PipeParams = Parameters<ObjectTranslateIdsPipe['transform']>[1]

describe('ObjectTranslateIdsPipe', () => {
  let pipe: ObjectTranslateIdsPipe

  beforeEach(() => {
    pipe = new ObjectTranslateIdsPipe(new TranslateIdPipe())
  })

  describe('when considering keys', () => {
    let params: PipeParams

    beforeEach(() => {
      params = { consider: 'KEYS', category: 'PATIENTS' }
    })

    describe('and input is empty', () => {
      it('returns empty object', () => {
        const output = pipe.transform({}, params)

        expect(output).toEqual({})
      })
    })

    describe('and input is not empty', () => {
      it('builds translate ids only for object keys but transforms values to string representation', () => {
        const output = pipe.transform(
          { number: 1, string: 'one', object: { one: 1 }, boolean: true, array: [1, 2, 3, 4] },
          params
        )

        expect(output).toEqual({
          'PATIENTS.NUMBER': '1',
          'PATIENTS.STRING': 'one',
          'PATIENTS.OBJECT': '[object Object]',
          'PATIENTS.BOOLEAN': 'true',
          'PATIENTS.ARRAY': '1,2,3,4',
        })
      })
    })
  })

  describe('when considering value', () => {
    let params: PipeParams

    beforeEach(() => {
      params = { consider: 'VALUES', category: 'DRUGS' }
    })

    describe('and input is empty', () => {
      it('returns empty object', () => {
        const output = pipe.transform({}, params)

        expect(output).toEqual({})
      })
    })

    describe('and input is not empty', () => {
      it('builds translate ids only for object values', () => {
        const output = pipe.transform(
          { number: 1, string: 'one', object: { one: 1 }, boolean: true, array: [1, 2, 3, 4] },
          params
        )

        expect(output).toEqual({
          number: 'DRUGS.1',
          string: 'DRUGS.ONE',
          object: 'DRUGS.[OBJECT OBJECT]',
          boolean: 'DRUGS.TRUE',
          array: 'DRUGS.1,2,3,4',
        })
      })
    })
  })

  describe('when considering all fields', () => {
    let params: PipeParams

    beforeEach(() => {
      params = { consider: 'ALL', category: 'PATIENTS' }
    })

    describe('and input is empty', () => {
      it('returns empty object', () => {
        const output = pipe.transform({}, params)

        expect(output).toEqual({})
      })
    })

    describe('and input is not empty', () => {
      it('builds translate ids both for keys and values', () => {
        const output = pipe.transform(
          { number: 1, string: 'one', object: { one: 1 }, boolean: true, array: [1, 2, 3, 4] },
          params
        )

        expect(output).toEqual({
          'PATIENTS.NUMBER': 'PATIENTS.1',
          'PATIENTS.STRING': 'PATIENTS.ONE',
          'PATIENTS.OBJECT': 'PATIENTS.[OBJECT OBJECT]',
          'PATIENTS.BOOLEAN': 'PATIENTS.TRUE',
          'PATIENTS.ARRAY': 'PATIENTS.1,2,3,4',
        })
      })
    })
  })
})
