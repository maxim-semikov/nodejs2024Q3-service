import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Maxim Semikov Nodejs2024Q3-service!';
  }
}
