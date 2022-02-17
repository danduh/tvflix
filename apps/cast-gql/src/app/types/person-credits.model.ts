import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PersonCreditsModel {
  @Field()
  id: number

  @Field((type) => [CreditModel])
  cast: CreditModel[]

  constructor(entity: PersonCreditsModel) {
    Object.assign(this, { ...entity })
  }
}

@ObjectType()
export class CreditModel {
  @Field()
  character: string
  @Field()
  creditId: string
  @Field()
  releaseDate: string
  @Field()
  title: string
  @Field()
  id: number
  @Field()
  backdropPath: string
  @Field()
  posterPath: string

  constructor(entity: Partial<CreditModel>) {
    Object.assign(this, { ...entity })
  }

}

