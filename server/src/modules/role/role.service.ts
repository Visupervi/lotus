import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/model/role.model';
import { Repository } from 'typeorm';
import { RoleCreateDTO, RoleDelDTO, RoleListDTO } from './role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(options: RoleCreateDTO) {
    const info = await this.roleRepository.findOne({ where: { name: options.name } });
    if (info) {
      throw new Error('角色名已存在');
    }
    const res = await this.roleRepository.save(options);
    return res;
  }

  async getList(options: RoleListDTO) {
    const skip = options.pageSize * options.pageNum - options.pageSize;
    const sort = options.sort === 2 ? 'ASC' : 'DESC';
    const list = await this.roleRepository.createQueryBuilder('role').orderBy('role.id', sort).skip(skip).take(options.pageSize).getMany();
    return list;
  }

  delete(options: RoleDelDTO) {}

  async findRoleAndRouters(id: number) {
    const role = await this.roleRepository.createQueryBuilder('role').leftJoinAndSelect('role.routes', 'routes').where(`role.id = ${id}`).getOne();
    return role;
  }
}
