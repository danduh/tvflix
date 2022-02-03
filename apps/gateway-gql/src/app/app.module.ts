import { Module } from '@nestjs/common';
import { GatewayModuleOptions, GraphQLGatewayModule } from "@nestjs/graphql";
import { IntrospectAndCompose } from "@apollo/gateway";

@Module({
  providers: [],
  imports: [
    GraphQLGatewayModule.forRootAsync({
      useFactory: async (): Promise<GatewayModuleOptions> => {
        return {
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
