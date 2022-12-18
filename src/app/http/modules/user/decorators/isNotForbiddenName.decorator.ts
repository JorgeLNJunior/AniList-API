import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from '@nestjs/class-validator'

@ValidatorConstraint()
export class IsNotForbiddenNameConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any): boolean {
    if (String(value).toLowerCase() === 'admin') return false
    return true
  }

  defaultMessage?(): string {
    return 'forbidden "name"'
  }
}

export function IsNotForbiddenName(validationOption?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOption,
      constraints: [],
      validator: IsNotForbiddenNameConstraint
    })
  }
}
