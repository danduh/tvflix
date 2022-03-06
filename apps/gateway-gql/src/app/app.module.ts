import {Module} from '@nestjs/common';
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloGatewayDriverConfig, ApolloGatewayDriver} from "@nestjs/apollo";
import {IntrospectAndCompose} from "@apollo/gateway";
import * as fs from "fs";
import * as path from "path";

interface SharedConfig {
  subgraphs: { name: string, url: string }[]
}

const defaultConfig: SharedConfig = {subgraphs: [{name: 'person', url: 'http://localhost:3001/graphql'}]}

const getSharedConfig = () => {
  try {
    const config: SharedConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../gql-config.json'), 'utf-8'))
    console.log(config);
    return config.subgraphs
  } catch (e) {
    console.error(e)
  }
  console.log(process.env);
  return defaultConfig.subgraphs
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
              subgraphs: getSharedConfig()
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
