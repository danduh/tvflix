import {Module} from '@nestjs/common';
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloGatewayDriverConfig, ApolloGatewayDriver} from "@nestjs/apollo";
import {IntrospectAndCompose} from "@apollo/gateway";

const subNodes = {
  person: () => {
    console.log(process.env);
    return 'http://localhost:3001/graphql'
  }
}


@Module({
  providers: [],
  imports: [
    GraphQLModule.forRootAsync({
      driver: ApolloGatewayDriver,
      useFactory: async (): Promise<any> => {
        return {
          playground: true,
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
                {name: 'person', url: subNodes.person()}
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
