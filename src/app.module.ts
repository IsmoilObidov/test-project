import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './config/middleware/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { databaseProviders } from './database/database.providers';

@Module({
  imports: [CatsModule, AuthModule, UsersModule, DatabaseModule],
  providers: [
    {
      // actions before app starts
      provide: 'ASYNC_CONNECTION',
      useFactory: async () => {
        for (let i = 0; i < 10; i++) {
          console.log(i);
        }
        console.log(databaseProviders);
        
      },
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}
