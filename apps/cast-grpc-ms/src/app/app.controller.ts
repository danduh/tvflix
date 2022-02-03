import { Controller } from '@nestjs/common';

import { AppService } from './app.service';
import { GrpcMethod } from "@nestjs/microservices";
import { Metadata, ServerUnaryCall } from "@grpc/grpc-js";

interface PersonParamById {
  id: number
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @GrpcMethod('CastService', 'GetOnePerson')
  getOnePerson(data: PersonParamById, metadata: Metadata, call: ServerUnaryCall<any, any>) {
    console.log(data)
    return this.appService.getPersonData(data.id);
  }

  @GrpcMethod('CastService', 'GetPersonImages')
  getOnePersonImages(data: PersonParamById, metadata: Metadata, call: ServerUnaryCall<any, any>) {
    console.log(data)
    return this.appService.getPersonImages(data.id);
  }

  @GrpcMethod('CastService', 'GetPersonCredits')
  getOnePersonCredits(data: PersonParamById, metadata: Metadata, call: ServerUnaryCall<any, any>) {
    console.log(data)
    return this.appService.getPersonCredits(data.id);
  }
}
