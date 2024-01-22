import { GraphQLResolveInfo } from "graphql";
import { getPost, getPosts } from "../services/post.service";

export const postsResolver = {
  Query: {
    async posts(_: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) {
      return await getPosts({ info });
    },
    async post(_: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) {
      return await getPost({ id: args.id, info });
    },
  },
  Mutation: {},
};
