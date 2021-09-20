import { BcryptService } from '../bcrypt.service'

describe('BcryptService', () => {
  let service: BcryptService

  beforeEach(() => {
    service = new BcryptService()
  })

  describe('hash', () => {
    test('should return a hash', async () => {
      const hash = await service.hash('password')

      expect(hash).toBeDefined()
      expect(typeof hash).toBe('string')
    })
  })

  describe('compare', () => {
    test('should return true if the hash matches', async () => {
      const password = 'password'
      const hash = await service.hash(password)
      const result = await service.compare(password, hash)

      expect(result).toBe(true)
    })

    test('should return false if the hash does not match', async () => {
      const hash = await service.hash('password')
      const result = await service.compare('wrong-password', hash)

      expect(result).toBe(false)
    })
  })
})
