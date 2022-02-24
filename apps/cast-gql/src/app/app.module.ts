import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver } from '@nestjs/apollo';

import { AppService } from './app.service';
import { join } from "path";
import { PersonResolver } from "../person/person.resolver";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      driver: ApolloFederationDriver,
      useFactory: () => ({
        playground:true,
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
          url: 'localhost:5000',
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
