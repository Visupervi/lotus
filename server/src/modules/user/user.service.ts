import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../../model/role.model';
import { User } from '../../model/user.model';
import { Lessee } from '../../model/lessee.model';
import { Repository } from 'typeorm';
import { UserCreateDTO, UserLoginDTO, UserUpdateDTO } from './user.dto';
import { passwordHash, passwordVerify } from 'src/utils/pasd.utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Lessee)
    private lesseeRepository: Repository<Lessee>,
  ) {}

  async login(options: UserLoginDTO) {
    const lessee = await this.lesseeRepository.findOne({
      where: { appId: options.appId },
    });
    if (!lessee) {
      throw new HttpException('appId not found', HttpStatus.FORBIDDEN);
    }
    const info = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('user.lessee', 'lessee as lessee_u')
      .where(`user.email = '${options.email}' And user.lessee = '${lessee.id}'`)
      .addSelect('user.password')
      .getOne();
    if (!info) {
      throw new HttpException('user not found', HttpStatus.FORBIDDEN);
    }
    const statu = passwordVerify(options.password, info.password);
    if (!statu) {
      throw new HttpException('password not found', HttpStatus.FORBIDDEN);
    }
    return info;
  }

  async list() {
    const list = await this.usersRepository.find();
    return list;
  }

  async created(options: UserCreateDTO) {
    const role = await this.roleRepository.findOne({
      where: { id: options.role },
    });
    if (!role) {
      throw new HttpException('role not found', HttpStatus.NOT_FOUND);
    }
    const lessee = await this.lesseeRepository.findOne({
      where: { appId: options.appId },
    });
    if (!lessee) {
      throw new HttpException('appid not found', HttpStatus.NOT_FOUND);
    }
    const info = await this.usersRepository
      .createQueryBuilder('user')
      .where(`user.email = '${options.email}' And user.lessee = ${lessee.id}`)
      .addSelect('user.password')
      .getOne();
    if (info) {
      throw new HttpException('email already exist', HttpStatus.UNAUTHORIZED);
    }
    const res = this.usersRepository.save({
      email: options.email,
      userName: options.userName,
      password: passwordHash(options.password),
      lessee: lessee,
      role: role,
    });
    return res;
  }

  async update(userId: number, options: UserUpdateDTO) {
    await this.usersRepository.update(userId, { avatar: options.avatar });
  }

  async findOne(email: string) {
    return await this.usersRepository.findOne({ where: { email: email } });
  }

  async findId(id: number) {
    return await this.usersRepository.findOne({ where: { id }, select: { password: false } });
  }
}
