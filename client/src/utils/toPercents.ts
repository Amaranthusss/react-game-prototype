import _ from 'lodash'

export function toPercents(value: number, max: number): number {
  return _.chain(value).divide(max).multiply(100).value()
}
