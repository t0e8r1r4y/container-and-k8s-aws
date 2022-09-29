import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EmailService } from 'src/email/email.service';
import * as uuid from 'uuid';
import { ulid } from 'ulid';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(private emailService: EmailService, @InjectRepository(User) private userRepository: Repository<User>) {}


  async create(createUserDto: CreateUserDto) {
    await this.checkUserExists(createUserDto.email);
    const signupVerifyToken = uuid.v1();
    await this.saveUser(createUserDto, signupVerifyToken);
    await this.sendMemberJoinEmail(createUserDto.email, signupVerifyToken);
  }

  // 이미 가입한 유저를 체크하는 로직
  private async checkUserExists(emailAddress: string) : Promise<boolean> {
    return false;
  }

  // 유저를 저장하는 로직
  private async saveUser(createUserDto: CreateUserDto, signupVerifyToken: string) {
    const user = new User();
    user.id = ulid();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.signupVerifyToken = signupVerifyToken;
    await this.userRepository.save(user);
  }

  // 인증 메일을 송신하는 로직
  // 인증에 대한 처리는 email 서비스로 분리함
  private async sendMemberJoinEmail(email:string, signupVerifyToken: string) {
    await this.emailService.sendMemverJoinVerification(email, signupVerifyToken);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
