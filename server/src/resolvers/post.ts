import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import dataSource from "../app-data-source";
import { Post } from "../entities/Post";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";

@InputType()
class PostInput {
  @Field()
  title: string;
  @Field()
  text: string;
}

@Resolver(Post)
export class PostResolver {
  @FieldResolver(() => String)
  textSnippet(@Root() root: Post) {
    return root.text.slice(0, 50);
  }

  @Query(() => [Post])
  async posts(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<Post[]> {
    const realLimit = Math.min(50, limit);
    const queryBuilder = dataSource
      .getRepository(Post)
      .createQueryBuilder("p")
      .orderBy('"createdAt"', "DESC")
      .take(realLimit);

    if (cursor) {
      queryBuilder.where('"createdAt" < :cursor', {
        cursor: new Date(parseInt(cursor)),
      });
    }

    return queryBuilder.getMany();
  }

  @Query(() => Post, { nullable: true })
  post(@Arg("id") id: number): Promise<Post | null> {
    return Post.findOne({ where: { id } });
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("input") input: PostInput,
    @Ctx() { req }: MyContext
  ): Promise<Post> {
    return Post.create({ ...input, creatorId: req.session.userId }).save();
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id") id: number,
    @Arg("title", () => String, { nullable: true }) title: string
  ): Promise<Post | null> {
    const post = await Post.findOne({ where: { id } });
    if (!post) {
      return null;
    }
    if (typeof title !== "undefined") {
      Post.update({ id }, { title });
    }
    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg("id") id: number): Promise<boolean> {
    await Post.delete(id);
    return true;
  }
}
