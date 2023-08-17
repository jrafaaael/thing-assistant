import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RoomModule } from './room/room.module';

@Module({
  imports: [ConfigModule.forRoot(), RoomModule],
})
export class AppModule {}
