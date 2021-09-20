import { ConfigService } from '@nestjs/config'

import { UserStorage } from '../../storage/user.storage'
import { UserCloudinaryStorage } from '../../storage/userCloudinary.storage'
import { UserLocalStorage } from '../../storage/userLocal.storage'

describe('UserStorage', () => {
  let userStorage: UserStorage
  let config: ConfigService

  beforeEach(() => {
    config = new ConfigService()
    userStorage = new UserStorage(config)
  })

  afterEach(() => jest.clearAllMocks())

  describe('getStorage', () => {
    afterEach(() => jest.clearAllMocks())

    test('should return a UserLocalStorage instance', async () => {
      jest.spyOn(config, 'get').mockReturnValue('local')
      const storage = userStorage.getStorage()

      expect(storage).toBeInstanceOf(UserLocalStorage)
      expect(config.get).toBeCalledTimes(1)
    })

    test('should return a UserCloudinaryStorage instance', async () => {
      jest.spyOn(config, 'get').mockReturnValue('cloudinary')

      const storage = userStorage.getStorage()

      expect(storage).toBeInstanceOf(UserCloudinaryStorage)
      expect(config.get).toBeCalledTimes(1)
    })

    test('should throw an error if it receives a invalid storage name', async () => {
      jest.spyOn(config, 'get').mockReturnValue('invalid-storage')

      expect(() => {
        userStorage.getStorage()
      }).toThrow()
      expect(config.get).toBeCalledTimes(1)
    })
  })

  test('should return a url', async () => {
    jest.spyOn(config, 'get').mockReturnValue('cloudinary')
    jest.spyOn(userStorage, 'getStorage').mockReturnValue({
      uploadAvatar: jest.fn().mockResolvedValue('url'),
      deleteOldAvatar: jest.fn().mockResolvedValue(true)
    })

    const buffer = Buffer.from('')
    const url = await userStorage.uploadAvatar(buffer)

    expect(url).toBe('url')
    expect(userStorage.getStorage().uploadAvatar).toBeCalledTimes(1)
    expect(userStorage.getStorage().uploadAvatar).toBeCalledWith(buffer)
  })

  test('should delete a avatar', async () => {
    jest.spyOn(config, 'get').mockReturnValue('cloudinary')
    jest.spyOn(userStorage, 'getStorage').mockReturnValue({
      uploadAvatar: jest.fn().mockResolvedValue('url'),
      deleteOldAvatar: jest.fn().mockResolvedValue(true)
    })

    await userStorage.deleteOldAvatar('url')

    expect(userStorage.getStorage().deleteOldAvatar).toBeCalledTimes(1)
    expect(userStorage.getStorage().deleteOldAvatar).toBeCalledWith('url')
  })
})
