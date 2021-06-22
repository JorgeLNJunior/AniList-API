import { PrismaService } from '@shared/services/prisma.service';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsUserAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any): boolean | Promise<boolean> {
    const prisma = new PrismaService();
    return prisma.user
      .findFirst({
        where: { email: value },
      })
      .then((isUserAlreadyExist) => {
        if (isUserAlreadyExist) return false;
        return true;
      })
      .finally(() => {
        prisma.$disconnect();
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
