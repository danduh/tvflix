import { Directive, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
// @Directive(`@key(fields: "id")`)
export class PersonModel {
  @Field()
  id: number;

  @Field({ description: 'Persons Name' })
  name: string

  @Field(() => [String], { nullable: true })
  alsoKnownAs?: string[];

  @Field()
  biography: string

  @Field({ nullable: true })
  imdbId: string

  @Field()
  popularity: number

  @Field()
  birthday: string

  constructor(entity: Partial<PersonModel>) {
    Object.assign(this, { ...entity })
  }
}
