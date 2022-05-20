import { ConfigService } from '@nestjs/config';

import { AnimeStorage } from '../../storage/anime.storage';
import { AnimeCloudinaryStorage } from '../../storage/animeCloudinary.storage';
import { AnimeLocalStorage } from '../../storage/animeLocal.storage';

describe('AnimeStorage', () => {
  let animeStorage: AnimeStorage;
  let config: ConfigService;

  beforeEach(() => {
    config = new ConfigService();
    animeStorage = new AnimeStorage(config);
  });

  afterEach(() => jest.clearAllMocks());

  describe('getStorage', () => {
    afterEach(() => jest.clearAllMocks());

    test('should return a AnimeLocalStorage instance', async () => {
      jest.spyOn(config, 'get').mockReturnValue('local');
      const storage = animeStorage.getStorage();

      expect(storage).toBeInstanceOf(AnimeLocalStorage);
      expect(config.get).toBeCalledTimes(1);
    });

    test('should return a AnimeCloudinaryStorage instance', async () => {
      jest.spyOn(config, 'get').mockReturnValue('cloudinary');

      const storage = animeStorage.getStorage();

      expect(storage).toBeInstanceOf(AnimeCloudinaryStorage);
      expect(config.get).toBeCalledTimes(1);
    });

    test('should throw an error if it receives a invalid storage name', async () => {
      jest.spyOn(config, 'get').mockReturnValue('invalid-storage');

      expect(() => {
        animeStorage.getStorage();
      }).toThrow();
      expect(config.get).toBeCalledTimes(1);
    });
  });

  test('should return a url', async () => {
    jest.spyOn(config, 'get').mockReturnValue('cloudinary');
    jest.spyOn(animeStorage, 'getStorage').mockReturnValue({
      uploadCover: jest.fn().mockResolvedValue('url'),
      deleteOldCover: jest.fn().mockResolvedValue(true),
    });

    const buffer = Buffer.from('');
    const url = await animeStorage.uploadCover(buffer);

    expect(url).toBe('url');
    expect(animeStorage.getStorage().uploadCover).toBeCalledTimes(1);
    expect(animeStorage.getStorage().uploadCover).toBeCalledWith(buffer);
  });

  test('should delete a cover', async () => {
    jest.spyOn(config, 'get').mockReturnValue('cloudinary');
    jest.spyOn(animeStorage, 'getStorage').mockReturnValue({
      uploadCover: jest.fn().mockResolvedValue('url'),
      deleteOldCover: jest.fn().mockResolvedValue(true),
    });

    await animeStorage.deleteOldCover('url');

    expect(animeStorage.getStorage().deleteOldCover).toBeCalledTimes(1);
    expect(animeStorage.getStorage().deleteOldCover).toBeCalledWith('url');
  });
});
