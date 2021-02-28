import { camelize } from '../foramt/string'

test('camlize', () => {
  expect(camelize('ab')).toEqual('ab')
  expect(camelize('a-b')).toEqual('aB')
  expect(camelize('a-b-')).toEqual('aB-')
  expect(camelize('-a-b')).toEqual('AB')
  expect(camelize('-')).toEqual('-')
})
