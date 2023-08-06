import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Friend } from 'src/model/friend.model';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { FriendAddDTO } from './friend.dto';
import { RoomService } from '../room/room.service';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(Friend)
    private friendRepository: Repository<Friend>,
    @Inject(forwardRef(() => UserService))
    private readonly usersService: UserService,
    @Inject(forwardRef(() => RoomService))
    private readonly roomService: RoomService,
  ) {}

  async getMyProfile(userId: number) {
    const user = await this.usersService.findId(userId);
    return user;
  }

  async updateRoomId(userId: number, friendId: number, roomId: string) {
    const res = await this.friendRepository
      .createQueryBuilder('friend')
      .where(`friend.user = ${userId} And friend.friend = ${friendId}`)
      .getOne();
    res.roomId = roomId;
    await this.friendRepository.update(res.id, { roomId });
    return res;
  }

  async getFriend(userId: number, friendId: number) {
    const res = await this.friendRepository
      .createQueryBuilder('friend')
      .where(`friend.user = ${userId} And friend.friend = ${friendId}`)
      .getOne();
    return res;
  }

  async getRooms(roomId: string) {
    const res = await this.friendRepository.find({ where: { roomId } });
    return res;
  }

  async addFriend(userId: number, options: FriendAddDTO) {
    const toInfo = await this.friendRepository
      .createQueryBuilder('friend')
      .where(`friend.user = ${userId} And friend.friend = ${options.friendId}`)
      .getOne();
    if (toInfo) {
      throw new Error('friend apply already existed');
    }
    const user = await this.usersService.findId(userId);
    const friend = await this.usersService.findId(options.friendId);
    const room = await this.roomService.createFriendRoom(userId, friend.id);
    if (!friend) {
      throw new Error('friend not found');
    }
    await this.friendRepository.update(toInfo.id, { statue: 1, roomId: room.roomId });
    const info: Friend = {
      user: user,
      friend: friend,
      remark: options.remark,
      wording: options.wording,
      roomId: room.roomId,
      statue: 0,
      type: 0,
    };
    const res = await this.friendRepository.save(info);
    return res;
  }

  async checkFriend(userId: number, friendIdList: number[]) {
    let successUserIdList = [],
      failureUserIdList = [];
    for (const iterator of friendIdList) {
      const info = await this.friendRepository
        .createQueryBuilder('friend')
        .where(`friend.user = ${userId} And friend.statue = 1`)
        .getOne();
      if (info) {
        successUserIdList.push({ friendId: iterator, code: 1 });
      } else {
        failureUserIdList.push({ friendId: iterator, code: 0 });
      }
    }
    return { successUserIdList, failureUserIdList };
  }

  async getFriendProfile(friendIdList: number[]) {
    let list = [];
    for (const iterator of friendIdList) {
      const user = await this.usersService.findId(iterator);
      if (user) {
        list.push(user);
      }
    }
    return list;
  }

  async getFriendApplicationList(userId: number) {
    const list = await this.friendRepository
      .createQueryBuilder('friend')
      .leftJoinAndSelect('friend.user', 'user as user_u')
      .leftJoinAndSelect('friend.friend', 'user as user_f')
      .where(`friend.friend = ${userId} And friend.statue = 0`)
      .getMany();
    return list;
  }

  async friendConversationList(userId: number) {
    const list = await this.friendRepository
      .createQueryBuilder('friend')
      .leftJoinAndSelect('friend.user', 'user as user_u')
      .leftJoinAndSelect('friend.friend', 'user as user_f')
      .where(`friend.user = ${userId} And friend.statue = 1`)
      .getMany();
    return list;
  }

  async acceptFriendApplication(userId: number, friendId: number) {
    const info = await this.friendRepository
      .createQueryBuilder('friend')
      .leftJoinAndSelect('friend.user', 'user as user_u')
      .leftJoinAndSelect('friend.friend', 'user as user_f')
      .where(`friend.user = ${friendId} And friend.friend = ${userId}`)
      .getOne();
    await this.friendRepository.update(info.id, { statue: 1 });
    const res = await this.friendRepository.save({
      user: info.friend,
      friend: info.user,
      statue: 1,
      type: 0,
    });
    return res;
  }

  async refuseFriendApplication(userId: number, friendId: number) {
    const info = await this.friendRepository
      .createQueryBuilder('friend')
      .leftJoinAndSelect('friend.user', 'user as user_u')
      .leftJoinAndSelect('friend.friend', 'user as user_f')
      .where(`friend.user = ${friendId} And friend.friend = ${userId}`)
      .getOne();
    const res = await this.friendRepository.update(info.id, { statue: 3 });
    return res;
  }

  async deleteFriendApplication(userId: number, friendId: number) {
    const info = await this.friendRepository
      .createQueryBuilder('friend')
      .leftJoinAndSelect('friend.user', 'user as user_u')
      .leftJoinAndSelect('friend.friend', 'user as user_f')
      .where(`friend.user = ${friendId} And friend.friend = ${userId}`)
      .getOne();
    const res = await this.friendRepository.update(info.id, { statue: 2 });
    return res;
  }
}
