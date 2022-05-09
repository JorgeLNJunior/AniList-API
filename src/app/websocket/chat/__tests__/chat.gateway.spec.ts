import { JwtModule } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'

import { ChatGateway } from '../chat.gateway'

describe('ChatGateway', () => {
  let gateway: ChatGateway

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({ secret: 'secret' })],
      providers: [ChatGateway]
    }).compile()

    gateway = module.get(ChatGateway)
  })

  test('should emit a message', async () => {
    const data = {
      userUUID: 'uuid',
      avatar: 'avatar',
      message: 'message',
      username: 'user'
    }
    const socket = { emit: (chat: string, data: unknown) => data }
    const socketSpy = jest.spyOn(socket, 'emit')

    gateway.socket = socket

    gateway.handleChatMessage(data)

    expect(socketSpy).toBeCalledTimes(1)
    expect(socketSpy).toBeCalledWith('chat', data)
  })
})
