import { Module } from '@nestjs/common';
import { GraphQLFederationModule } from '@nestjs/graphql';

import { AppService } from './app.service';
import { join } from "path";
import { PersonResolver } from "../person/person.resolver";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    GraphQLFederationModule.forRootAsync({
      useFactory: () => ({
        autoSchemaFile: join(process.cwd(), 'apps/cast-gql/src/schema.gql'),
        // context: (context) => {
        //   return context;
        // },
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
          protoPath: join(
            __dirname,
            '../cast-grpc-ms/assets/proto/cast.proto'
          ),
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
