import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { SearchUserDto } from './dto/search-user-dto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class UsersService {
  constructor(
    private readonly db: DbService,
    private readonly event: EventEmitter2
  ) { }

  findAll(query: SearchUserDto) {

    this.event.emit("user.find.many", { query });
    
    return this.db.user.findMany({
      where: {
        ...(query.name ? { name: { contains: query.name, mode: 'insensitive' } } : {}),
        ...(query.email ? { email: { contains: query.email, mode: 'insensitive' } } : {}),
        ...(query.id ? { id: query.id } : {}),
        ...(query.createdAt ? { createdAt: { gte: query.createdAt } } : {}),
        ...(query.updatedAt ? { updatedAt: { gte: query.updatedAt } } : {}),
      },
      select: { id: true, name: true, email: true, picUrl: true, createdAt: true, updatedAt: true },
      take: Number(query.limit) || 10,
      skip: ((Number(query.page) || 1) - 1) * Number(query.limit!),
    });
  }

  findOne(id: number) {
    return this.db.user.findUnique({ where: { id }, select: { id: true, name: true, email: true } });
  }

}
