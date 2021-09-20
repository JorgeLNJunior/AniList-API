import * as fs from 'fs'

import { AnimeLocalStorage } from '../../storage/animeLocal.storage'

describe('AnimeLocalStorage', () => {
  let animeStorage: AnimeLocalStorage

  beforeEach(() => {
    animeStorage = new AnimeLocalStorage()
  })

  describe('uploadAvatar', () => {
    test('should return a url', async () => {
      const fsSpy = jest
        .spyOn(fs.promises, 'writeFile')
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .mockImplementation((path: string, buffer: Buffer) =>
          Promise.resolve()
        )

      process.env.APP_HOST = 'host'

      const buffer = Buffer.from('')
      const url = await animeStorage.uploadCover(buffer)

      expect(typeof url).toBe('string')
      expect(fsSpy).toBeCalledTimes(1)
    })
  })

  describe('deleteOldAvatar', () => {
    test('should delete a file', async () => {
      const fsSpy = jest
        .spyOn(fs.promises, 'unlink')
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .mockImplementation((path: string) => Promise.resolve())

      await animeStorage.deleteOldCover('url/uuid.jpg')

      expect(fsSpy).toBeCalledTimes(1)
    })
  })
})
