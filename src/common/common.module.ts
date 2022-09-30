import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key.guard';
import { LoggingMiddleware } from './middleware/logging.middleware';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
  ],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
    //
    /* apply to 1 route
    consumer
      .apply(LoggingMiddleware)
      .forRoutes({ path: 'coffees', method: RequestMethod.GET });
    // */
    //
    /* apply to all routes with controller exception
    consumer.apply(LoggingMiddleware).exclude('coffees').forRoutes('*');
    // */
    //
    /* apply to all routes with 1 route exception
    consumer
      .apply(LoggingMiddleware)
      .exclude({ path: 'coffees', method: RequestMethod.GET })
      .forRoutes('*');
    // */
  }
}
