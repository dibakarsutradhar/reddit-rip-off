import { Field, InputType } from "type-graphql";

@InputType()
export class UPInput {
  @Field()
  email: string; // UP = Username Password
  // UP = Username Password
  @Field()
  username: string;
  @Field()
  password: string;
}
