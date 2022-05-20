import { IsYoutubeUrlConstraint } from '../../decorators/isYoutubeUrl.decorator';

describe('IsYoutubeUrlDecorator', () => {
  let decorator: IsYoutubeUrlConstraint;

  beforeEach(async () => {
    decorator = new IsYoutubeUrlConstraint();
  });

  test('should return true if it receives a valid url', async () => {
    const result = decorator.validate('http://youtube.com/watch?v=2MKkj1DQ0NU');
    expect(result).toBe(true);
  });

  test('should return false if it receives an invalid url', async () => {
    const result = decorator.validate('invalid-url');
    expect(result).toBe(false);
  });

  test('should return false if it not receives a string', async () => {
    const result = decorator.validate(1);
    expect(result).toBe(false);
  });

  test('should return a default message', async () => {
    const message = decorator.defaultMessage();
    expect(message).toBe('"trailer" must be a valid youtube url');
  });
});
