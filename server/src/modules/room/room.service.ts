import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from '../../model/room.model';
import { Repository } from 'typeorm';
import { FriendService } from '../friend/friend.service';
import { UserService } from '../user/user.service';
import { getRoomId } from 'src/utils';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @Inject(forwardRef(() => FriendService))
    private readonly friendService: FriendService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async findRoomAndUsersId(id: string) {
    const room = await this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.users', 'user')
      .where(`room.roomId = '${id}'`)
      .getOne();
    return room;
  }

  async findRoomId(id: string) {
    const room = await this.roomRepository.createQueryBuilder('room').where(`room.roomId = '${id}'`).getOne();
    return room;
  }

  async createFriendRoom(userId: number, friendId: number) {
    const friend = await this.friendService.getFriend(userId, friendId);
    if (!friend || friend.statue != 1) return;
    if (friend.roomId) {
      const res = await this.findRoomAndUsersId(friend.roomId);
      return res;
    }
    const user1 = await this.userService.findId(userId);
    const user2 = await this.userService.findId(friendId);
    const room = new Room();
    room.roomId = getRoomId();
    room.type = 1;
    room.users = [user1, user2];
    const res = await this.roomRepository.save(room);
    return res;
  }

  async getUserRooms(userId: number) {
    const rooms = await this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.users', 'user')
      .where(`user.id = ${userId}`)
      .getMany();
    return rooms;
  }
}
