import { Args, Query, Resolver } from '@nestjs/graphql';
import { PersonModel } from "../app/types/person.model";
import { AppService } from "../app/app.service";
import { Injectable } from "@nestjs/common";
import { PersonImageModel } from "../app/types/person-image.model";
import { PersonCreditsModel } from "../app/types/person-credits.model";

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


  @Query(returns => PersonImageModel, {
    name: 'personaImages',
    description: 'Will return Persona/Cast Images'
  })
  getPersonImages(@Args({ name: 'id' }) id: number) {
    return this.service.getPersonImages({ id })
  }

  @Query(returns => PersonCreditsModel, {
    name: 'personaCredits',
    description: 'Will return Persona/Cast Credits'
  })
  getPersonCredits(@Args({ name: 'id' }) id: number) {
    return this.service.getPersonCredits({ id })
  }
}