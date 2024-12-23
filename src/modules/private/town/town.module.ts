import { Module } from '@nestjs/common';
import { TownService } from './town.service';
import { TownController } from './town.controller';

@Module({
  providers: [TownService],
  controllers: [TownController]
})
export class TownModule {}
