import { PartialType } from '@nestjs/swagger';

import { AddToUserListDto } from './addToUserList.dto';

export class UpdateUserListDto extends PartialType(AddToUserListDto) { }
