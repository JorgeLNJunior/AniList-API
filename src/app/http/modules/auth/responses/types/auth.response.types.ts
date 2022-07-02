import { User } from '@http/modules/user/entities/user.entity'

export const registerResponseExample: Partial<User> = {
  uuid: '1c12dd97-839e-4058-91f0-e75934b02d52',
  name: 'Easton',
  email: 'Easton.Hamill@gmail.com',
  avatar: null,
  isAdmin: false,
  isActive: false,
  createdAt: new Date('2021-09-16 14:38:09'),
  updatedAt: null,
  deletedAt: null
}
