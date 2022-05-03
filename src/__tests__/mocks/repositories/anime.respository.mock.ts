import { Anime } from '@http/modules/anime/entities/anime.entity'
import { DeepPartial } from 'typeorm'

export const animeRepositoryMock = {
  createQueryBuilder: jest.fn(() => ({
    select: jest.fn().mockReturnThis(),
    addSelect: jest.fn().mockReturnThis(),
    leftJoin: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    offset: jest.fn().mockReturnThis(),
    groupBy: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    getRawMany: jest.fn().mockResolvedValue(Promise.resolve())
  })),
  count: jest.fn().mockResolvedValue(10),
  findOne: jest.fn().mockResolvedValue(Promise.resolve()),
  create: jest.fn().mockImplementation((dto: DeepPartial<Anime>) => dto),
  save: jest.fn().mockResolvedValue(Promise.resolve()),
  update: jest.fn().mockResolvedValue(Promise.resolve()),
  softDelete: jest.fn().mockResolvedValue(Promise.resolve())
}
