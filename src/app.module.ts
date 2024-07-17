import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './config/middleware/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import { PhotosModule } from './photos/photos.module';

@Module({
  imports: [
    CatsModule,
    AuthModule,
    UsersModule,
    DatabaseModule,
    PhotosModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      database: 'test',
      username: 'root',
      password: '',
      entities: [User],
      synchronize: true,
      autoLoadEntities: true,
    }),
    PhotosModule,
  ],
  providers: [
    {
      // actions before app starts
      provide: 'ASYNC_CONNECTION',
      useFactory: async () => {
        for (let i = 0; i < 10; i++) {
          console.log(i + 'ms');
        }
        console.log(process.env.APP_ENV);
      },
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}
