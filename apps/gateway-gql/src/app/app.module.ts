import {Module} from '@nestjs/common';
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloGatewayDriverConfig, ApolloGatewayDriver} from "@nestjs/apollo";
import {IntrospectAndCompose} from "@apollo/gateway";
import * as fs from "fs";
import * as path from "path";


const subNodes = {
  person: () => {
    try {
      const config = fs.readFileSync(path.join(__dirname, '../gql-config.json'), 'utf-8')
      console.log(config);
    } catch (e) {
      console.error(e)
    }
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
