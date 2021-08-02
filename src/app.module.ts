import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from './config/config.module';
import { ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: async (configService: ConfigService) => ({
        "type": "mysql",
        "host": configService.get('database').host,
        "port": configService.get('database').port,
        "username": configService.get('database').user,
        "password": configService.get('database').password,
        "database": configService.get('database').schema,
        "entities": ["dist/**/**/*.entity{.ts,.js}"],
        "synchronize": true
      }),
      inject: [ConfigService],        
    }),
    AppConfigModule,
    CommentModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}