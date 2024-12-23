import { Module } from '@nestjs/common';
import { DetailSiteService } from './detail-site.service';
import { DetailSiteController } from './detail-site.controller';

@Module({
  providers: [DetailSiteService],
  controllers: [DetailSiteController]
})
export class DetailSiteModule {}
