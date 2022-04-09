import { createMock } from '@golevelup/ts-jest'
import { ExecutionContext } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { WsException } from '@nestjs/websockets'

import { WebSocketAuthGuard } from '../../guards/websocketAuth.guard'

describe('WebSocketAuthGuard', () => {
  let guard: WebSocketAuthGuard
  let jwtService: JwtService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebSocketAuthGuard,
        {
          provide: JwtService,
          useValue: { verifyAsync: jest.fn().mockResolvedValue(true) }
        }
      ]
    }).compile()

    guard = module.get(WebSocketAuthGuard)
    jwtService = module.get(JwtService)
  })

  test('should return true if it receives a valid jwt token', async () => {
    const ctx = createMock<ExecutionContext>({
      switchToWs: () => ({
        getClient: () => ({
          handshake: {
            query: { auth: 'token' }
          }
        })
      })
    })

    const result = await guard.canActivate(ctx)

    expect(result).toBe(true)
  })

  test('should return throw a WsException if it receives a invalid jwt token', async () => {
    const ctx = createMock<ExecutionContext>({
      switchToWs: () => ({
        getClient: () => ({
          handshake: {
            query: {}
          }
        })
      })
    })

    jest.spyOn(jwtService, 'verifyAsync').mockRejectedValue(new Error())

    // eslint-disable-next-line jest/valid-expect
    expect(guard.canActivate(ctx)).rejects.toThrow(WsException)
  })
})
