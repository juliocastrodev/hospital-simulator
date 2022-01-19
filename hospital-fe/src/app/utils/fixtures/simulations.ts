import { SimulationRegister } from '../../shared/domain/SimulationRegister'

export const TODAY = new SimulationRegister({
  id: 'abCdE',
  date: new Date(),
  patients: { F: 1, X: 0 },
  drugs: ['P'],
  results: { F: 0, X: 1 },
})

export const JANUARY_FIRST = new SimulationRegister({
  id: 'xYzTX',
  date: new Date('2021/01/01'),
  patients: { F: 1, D: 4, X: 10 },
  drugs: ['As', 'I', 'P'],
  results: { F: 0, D: 0, X: 14, H: 1 },
})

export const SIMULATIONS = [TODAY, JANUARY_FIRST]
