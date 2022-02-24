import { Module } from '@nestjs/common';
import {  GraphQLModule } from "@nestjs/graphql";
import {  ApolloGatewayDriverConfig, ApolloGatewayDriver } from "@nestjs/apollo";
import { IntrospectAndCompose } from "@apollo/gateway";

@Module({
  providers: [],
  imports: [
    GraphQLModule.forRootAsync({
      driver:ApolloGatewayDriver,
      useFactory: async (): Promise<any> => {
        return {
          playground:true,
          introspection: true,
          server: {
            formatResponse(response, requestContext) {
              return response;
            },
            cors: true,
          },
          gateway: {
            supergraphSdl: new IntrospectAndCompose({
              subgraphs: [
                // Into this list we will add all our subGraphs.
                { name: 'person', url: 'http://localhost:3001/graphql' }
              ]
            }),
            pollIntervalInMs: 3000,
          }
        };
      },
      imports: [],
      inject: []
    })
  ]
})
export class AppModule {
}
