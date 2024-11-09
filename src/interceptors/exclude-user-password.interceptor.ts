import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ExcludeUserPasswordInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map((item) => this.excludePassword(item));
        } else {
          return this.excludePassword(data);
        }
      }),
    );
  }

  private excludePassword(data: any) {
    const result = { ...data };
    delete result?.password;
    return result;
  }
}
