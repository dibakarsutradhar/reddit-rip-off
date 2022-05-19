import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

// Many to Many relationship
// user <-> posts
// user -> join table <- posts
// user -> updoot <- posts

@ObjectType()
@Entity()
export class Updoot extends BaseEntity {
  @Field()
  @Column({ type: "int" })
  value: number;

  @Field()
  @PrimaryColumn()
  userId: number;

  @Field()
  @ManyToOne(() => User, (user) => user.updoots)
  user: number;

  @Field()
  @PrimaryColumn()
  postId: number;

  @Field()
  @ManyToOne(() => Post, (post) => post.updoots)
  post: Post;
}
