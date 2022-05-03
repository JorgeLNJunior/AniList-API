import { IsNotForbiddenNameConstraint } from '../../decorators/isNotForbiddenName.decorator'

describe('IsNotForbiddenNameDecorator', () => {
  let decorator: IsNotForbiddenNameConstraint

  beforeEach(() => {
    decorator = new IsNotForbiddenNameConstraint()
  })

  test('should return false if it receives "admin" in lowercase', async () => {
    expect(decorator.validate('admin')).toBe(false)
  })

  test('should return false if it receives "admin" in uppercase', async () => {
    expect(decorator.validate('ADMIN')).toBe(false)
  })

  test('should return false if it receives "admin" in uppercase and lowercase', async () => {
    expect(decorator.validate('AdMiN')).toBe(false)
  })

  test('should return true if it not receives "admin"', async () => {
    expect(decorator.validate('user')).toBe(true)
  })

  test('should return a default message', async () => {
    expect(decorator.defaultMessage()).toBe('forbidden "name"')
  })
})
