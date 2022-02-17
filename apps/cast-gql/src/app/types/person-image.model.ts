import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PersonImageModel {
  @Field()
  id: number;

  @Field((type) => [ImageProfile])
  profiles: [ImageProfile]

  constructor(entity: PersonImageModel) {
    Object.assign(this, { ...entity })
  }
}

@ObjectType()
export class ImageProfile {
  @Field()
  aspectRatio: number
  @Field()
  filePath: string
  @Field()
  height: number
  @Field()
  voteAverage: number
  @Field()
  voteCount: number
  @Field()
  width: number

  constructor(entity: Partial<ImageProfile>) {
    Object.assign(this, { ...entity })
  }

}
