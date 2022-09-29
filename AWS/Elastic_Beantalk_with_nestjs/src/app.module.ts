import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MoviesModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movies/entities/movie.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.dev'
    }),
    TypeOrmModule.forRoot({
      // todo - need to make 'ormconfig' file -> clear
      type: 'postgres',
      host: process.env.RDS_HOSTNAME,
      port: +process.env.RDS_PORT,
      username: process.env.RDS_USERNAME,
      password: process.env.RDS_PASSWORD,
      database: process.env.RDS_DB_NAME,
      // synchronize: true, // 실제 운영 DB와 연동되게 되면 내가 개발했을 때 변경사항이 모조리 반영되어 버림
      // [중요] 배포, 개발, 실행 환경에 따라서 설정을 여러개 둔다.
      synchronize: process.env.NODE_ENV !== 'prod',
      // logging: true, // console 
      // [옵션] 개발 환경에서 sql을 확인하고 싶을 때
      logging: process.env.NODE_ENV !== 'prod',
      entities: [Movie],
    }),
    // UsersModule, 
    // EmailModule, 
    // ConfigModule.forRoot({ 
    //   envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
    //   load: [emailConfig],
    //   isGlobal: true,
    //   validationSchema,
    // }), 
    MoviesModule,
  ],
  controllers: [
    // AppController, 
    // ApiController
  ],
  providers: [
    // AppService, 
    // ConfigService
  ],
})
export class AppModule {}
