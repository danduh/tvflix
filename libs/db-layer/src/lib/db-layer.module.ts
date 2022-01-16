import { Module } from '@nestjs/common';
import { HttpModule } from "@nestjs/axios";
import { DbAccessService } from "../db-access";

@Module({
  controllers: [],
  providers: [DbAccessService],
  exports: [DbAccessService],
  imports: [HttpModule]
})
export class DbLayerModule {
}
