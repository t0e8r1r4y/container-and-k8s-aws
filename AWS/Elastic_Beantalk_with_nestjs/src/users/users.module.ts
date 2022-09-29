import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { EmailModule } from 'src/email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [EmailModule, TypeOrmModule.forFeature([User])], // Email Module에 서비스가 등록되어 있고 모듈을 불러와서 해당 Service를 실행한다.
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
