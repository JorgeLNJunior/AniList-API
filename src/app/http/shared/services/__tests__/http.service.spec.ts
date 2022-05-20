import { HttpService } from '../http.service';

describe('HttpService', () => {
  let httpService: HttpService;

  beforeEach(() => {
    httpService = new HttpService();
  });

  afterEach(() => jest.clearAllMocks());

  test('should return a valid response', async () => {
    const response = await httpService.get('https://catfact.ninja/fact');

    expect(response.data).toBeDefined();
  });
});
