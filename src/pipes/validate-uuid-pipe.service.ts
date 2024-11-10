import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { uuidValidateV4 } from '../helpers/uuidHelpers';

@Injectable()
export class ValidateUuidPipe implements PipeTransform {
  transform(value: string) {
    if (!uuidValidateV4(value)) {
      throw new BadRequestException('Invalid id');
    }
    return value;
  }
}
