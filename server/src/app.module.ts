import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
// import { ServiceModule } from './service/service.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    DbModule,
    AuthModule,
    UsersModule,
    // ServiceModule
  ],
})
export class AppModule {}
