import { GraphQLResolveInfo } from "graphql";
import { createUser, updateUser, deleteUser, getUser, getUsers } from "../services/user.service";

export const usersResolver = {
  Query: {
    async users(_: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) {
      return await getUsers({ info });
    },
    async user(_: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) {
      return await getUser({ id: args.id, info });
    },
  },
  Mutation: {
    async createUser(_: any, { input }: Record<string, any>) {
      return await createUser({ email: input.email, username: input.username });
    },
    async updateUser(_: any, { input, id }: Record<string, any>) {
      return await updateUser(id, { email: input.email, username: input.username });
    },
    async deleteUser(_: any, { id }: Record<string, any>) {
      return await deleteUser(id);
    },
  },
};
