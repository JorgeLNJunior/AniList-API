import { User } from '@http/modules/user/entities/user.entity';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { getRepository } from 'typeorm';

@ValidatorConstraint({ async: true })
export class IsUserAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any): boolean | Promise<boolean> {
    const userRepository = getRepository(User);
    return userRepository
      .findOne({
        where: { email: value },
      })
      .then((isUserAlreadyExist) => {
        if (isUserAlreadyExist) return false;
        return true;
      });
  }
  defaultMessage?(): string {
    return 'this email is already registered';
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
      validator: IsUserAlreadyExistConstraint,
    });
  };
}
