import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { FavoriteTypes, FavoriteTypeValues } from '../interface/interface';

@Injectable()
export class FavoriteTypeValidatorPipe implements PipeTransform {
  transform(value: string) {
    if (!FavoriteTypeValues.includes(value as FavoriteTypes)) {
      throw new BadRequestException(`Invalid favorite type: ${value}`);
    }
    return value as FavoriteTypes;
  }
}
