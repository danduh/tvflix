import { Args, Query, Resolver } from '@nestjs/graphql';
import { PersonModel } from "../app/types/person.model";
import { AppService } from "../app/app.service";
import { Injectable } from "@nestjs/common";

@Resolver(() => PersonModel)
@Injectable()
export class PersonResolver {
  constructor(private service: AppService) {
  }

  @Query(returns => PersonModel, {
    name: 'persona',
    description: 'Will return Persona/Cast Details'
  })
  getPerson(@Args({ name: 'id' }) id: number) {
    return this.service.getPersonData({ id })
  }
}
