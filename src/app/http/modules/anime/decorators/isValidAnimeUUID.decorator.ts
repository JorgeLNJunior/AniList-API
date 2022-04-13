import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'
import { Repository } from 'typeorm'

import { Anime } from '../entities/anime.entity'

@Injectable()
@ValidatorConstraint({ async: true })
export class IsValidAnimeUUIDConstraint
  implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Anime) private animeRepository: Repository<Anime>
  ) { }

  validate(uuid: string): boolean | Promise<boolean> {
    return this.animeRepository
      .findOne(uuid)
      .then((isValidAnimeUUID) => {
        if (isValidAnimeUUID) return true
        return false
      })
  }

  defaultMessage?(): string {
    return 'this anime does not exist'
  }
}

export function IsValidAnimeUUID(validationOption?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOption,
      constraints: [],
      validator: IsValidAnimeUUIDConstraint
    })
  }
}
