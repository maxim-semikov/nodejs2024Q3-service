import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaExceptionInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          switch (error.code) {
            case 'P2002':
              return throwError(
                () =>
                  new HttpException(
                    'Unique constraint violation',
                    HttpStatus.CONFLICT,
                  ),
              );
            case 'P2003':
              return throwError(
                () =>
                  new HttpException(
                    'Foreign key constraint violation',
                    HttpStatus.BAD_REQUEST,
                  ),
              );
            case 'P2004':
              return throwError(
                () =>
                  new HttpException(
                    'A required field is missing or is NULL',
                    HttpStatus.BAD_REQUEST,
                  ),
              );
            case 'P2025':
              return throwError(
                () =>
                  new HttpException(
                    'Record to update not found',
                    HttpStatus.NOT_FOUND,
                  ),
              );
            default:
              return throwError(
                () =>
                  new HttpException(
                    'Internal Server Error',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                  ),
              );
          }
        }
        return throwError(() => error);
      }),
    );
  }
}
