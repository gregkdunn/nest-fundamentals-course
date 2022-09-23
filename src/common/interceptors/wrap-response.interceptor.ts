import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('WrapResponseInterceptor.Before...');
    // must call the handle method
    // it returns an observable
    return next.handle().pipe(
      tap((data) => {
        console.log('WrapResponseInterceptor.After...', data);
      }),
      map((data) => ({ data })),
    );
  }
}
