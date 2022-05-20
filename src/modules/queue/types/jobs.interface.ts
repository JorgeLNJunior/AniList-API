import { User } from '@http/modules/user/entities/user.entity';

export interface AvatarCompressJob {
  userUUID: string;
  path: string;
}

export interface CoverCompressJob {
  animeUUID: string;
  path: string;
}

export interface EmailActivationJob {
  user: User;
}
