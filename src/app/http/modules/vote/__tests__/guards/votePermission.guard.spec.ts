import { createMock } from '@golevelup/ts-jest'
import { voteRepositoryMock } from '@mocks/repositories/vote.repository.mock'
import { BadRequestException, ExecutionContext } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'

import { Vote } from '../../entities/vote.entity'
import { VoteModifyPermissionGuard } from '../../guards/voteModifyPermission.guard'
import { VoteBuilder } from '../builder/vote.builder'

describe('VoteModifyPermissionGuard', () => {
  let guard: VoteModifyPermissionGuard

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VoteModifyPermissionGuard,
        { provide: getRepositoryToken(Vote), useValue: voteRepositoryMock }
      ]
    }).compile()

    guard = module.get(VoteModifyPermissionGuard)
  })

  afterEach(() => jest.clearAllMocks())

  test('should return true if the user is an admin', async () => {
    const ctx = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          user: { isAdmin: true, uuid: 'uuid' },
          params: { uuid: 'uuid' }
        })
      })
    })

    const result = await guard.canActivate(ctx)

    expect(result).toBe(true)
  })

  test('should return true if the user is the vote author', async () => {
    const vote = new VoteBuilder().build()
    const ctx = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          user: { isAdmin: false, uuid: vote.user.uuid },
          params: { uuid: vote.uuid }
        })
      })
    })

    voteRepositoryMock.findOne.mockResolvedValue(vote)

    const result = await guard.canActivate(ctx)

    expect(result).toBe(true)
  })

  test('should return false if the user does not have permission', async () => {
    const ctx = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          user: { isAdmin: false, uuid: 'a uuid' },
          params: { uuid: 'uuid' }
        })
      })
    })

    const result = await guard.canActivate(ctx)

    expect(result).toBe(false)
  })

  test('should throw a BadRequestException if the vote was not found', async () => {
    const ctx = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          user: { isAdmin: false, uuid: 'uuid' },
          params: { uuid: 'uuid' }
        })
      })
    })

    voteRepositoryMock.findOne.mockResolvedValue(undefined)

    await expect(guard.canActivate(ctx)).rejects.toThrow(BadRequestException)
  })
})
