import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { ChatGateway } from '../chat.gateway';

describe('ChatGateway', () => {
  let gateway: ChatGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({ secret: 'secret' })],
      providers: [ChatGateway],
    }).compile();

    gateway = module.get(ChatGateway);
  });

  test('should emit a message', async () => {
    const data = {
      avatar: 'avatar',
      message: 'message',
      username: 'user',
    };
    const client = { emit: (chat: string, data: unknown) => data };
    const clientSpy = jest.spyOn(client, 'emit');

    gateway.handleChatMessage(data, client);

    expect(clientSpy).toBeCalledTimes(1);
    expect(clientSpy).toBeCalledWith('chat', data);
  });
});
