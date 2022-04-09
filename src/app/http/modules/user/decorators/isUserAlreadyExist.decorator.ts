import { User } from '@http/modules/user/entities/user.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'
import { Repository } from 'typeorm'

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUserAlreadyExistConstraint
  implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) { }

  validate(value: any): boolean | Promise<boolean> {
    return this.userRepository
      .findOne({
        where: { email: value }
      })
      .then((isUserAlreadyExist) => {
        if (isUserAlreadyExist) return false
        return true
      })
  }

  defaultMessage?(): string {
    return 'this email is already registered'
  }
}

export function IsUserAlreadyExist(validationOption?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOption,
      constraints: [],
      validator: IsUserAlreadyExistConstraint
    })
  }
}
