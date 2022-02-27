import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver } from '@nestjs/apollo';

import { AppService } from './app.service';
import { join } from "path";
import { PersonResolver } from "../person/person.resolver";
import { ClientsModule, Transport } from "@nestjs/microservices";

const castGrpcService = process.env.GRPC_CAST_URL || 'localhost'
const castGrpcUrl = `${castGrpcService}:${process.env.PORT || '5000'}`
console.log('castGrpcUrl', castGrpcUrl);

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      driver: ApolloFederationDriver,
      useFactory: () => ({
        playground: true,
        introspection: true,
        autoSchemaFile: join(process.cwd(), 'apps/cast-gql/src/schema.gql'),
        buildSchemaOptions: { orphanedTypes: [] }
      })
    }),
    ClientsModule.register([
      {
        name: 'CAST_PACKAGE',
        transport: Transport.GRPC,
        options: {
          loader: {
            keepCase: false,
          },
          url: castGrpcUrl,
          package: 'cast',
          protoPath: join(__dirname, 'assets/proto/cast.proto'),
        },
      },
    ]),
  ],
  controllers: [],
  providers: [
    PersonResolver,
    AppService
  ],
})
export class AppModule {
}
