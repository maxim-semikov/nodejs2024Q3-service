import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { uuidValidateV4 } from '../helpers/uuidHelpers';

@Injectable()
export class ValidateUserIdPipe implements PipeTransform {
  transform(value: string) {
    if (!uuidValidateV4(value)) {
      throw new BadRequestException('Invalid user id');
    }
    return value;
  }
}
