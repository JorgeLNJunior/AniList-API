import { User } from '@http/modules/user/entities/user.entity'

export interface AvatarCompressJob {
  userUuid: string;
  path: string;
}

export interface CoverCompressJob {
  animeUuid: string;
  path: string;
}

export interface EmailConfirmationJob {
  user: User;
}
