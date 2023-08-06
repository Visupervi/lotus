import { OpenAPIObject } from '@nestjs/swagger';
import { Role } from '../model/role.model';
import { Routers } from '../model/routers.model';
import { User } from '../model/user.model';
import { getConfig } from '../utils';
import { DataSource } from 'typeorm';
import { Lessee } from '../model/lessee.model';
import { Room } from '../model/room.model';

const { MYSQL } = getConfig();
export async function initAppRoute(document: OpenAPIObject) {
  let routeList: { url: string; name: string; method: string }[] = [];
  for (const key in document.paths) {
    if (Object.prototype.hasOwnProperty.call(document.paths, key)) {
      const item = document.paths[key];
      if (item.post) {
        const name = item.post.tags.length > 0 ? item.post.tags[0] + '/' + item.post.summary : item.post.summary;
        routeList.push({ url: key, name, method: 'post' });
      } else {
        const name = item.get.tags.length > 0 ? item.get.tags[0] + '/' + item.get.summary : item.get.summary;
        routeList.push({ url: key, name, method: 'get' });
      }
    }
  }
  const configDataSource = new DataSource({
    type: 'mysql',
    ...MYSQL,
    entities: [Role, Routers, User, Room, Lessee],
    synchronize: true,
    logging: false,
  });
  configDataSource.initialize().then(async () => {
    const routersRepository = configDataSource.getRepository(Routers);
    for (const iterator of routeList) {
      const info = await routersRepository.findOne({
        where: { url: iterator.url, name: iterator.name, method: iterator.method },
      });
      if (!info) {
        const route = new Routers();
        route.name = iterator.name;
        route.url = iterator.url;
        route.method = iterator.method;
        routersRepository.save(route);
      } else if (info.name != iterator.name) {
        await routersRepository.update(info.id, { name: iterator.name });
      }
    }
  });
}
