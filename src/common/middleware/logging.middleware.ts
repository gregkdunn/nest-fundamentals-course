import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.time('LoggingMiddleware.Request-response time');
    console.log('LoggingMiddleware.start');

    res.on('finish', () =>
      console.timeEnd('LoggingMiddleware.Request-response time'),
    );
    next();
  }
}
