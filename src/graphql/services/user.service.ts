import { PrismaClient } from "@prisma/client";
import { extractSelection } from "../utils/extractSelections";
import { GraphQLResolveInfo } from "graphql";
import { GraphQLError } from 'graphql';

interface GetUsersArgs {
  info: GraphQLResolveInfo;
}

interface GetUserArgs extends GetUsersArgs {
  id: string;
}

interface UserInput {
  email: string;
  username?: string;
}

const prisma = new PrismaClient();

const fieldIdRequired = () => {
  throw new GraphQLError('The field id is required.', {
    extensions: {
      code: 'BAD_REQUEST',
    },
  });
};

export const getUsers = async ({ info }: GetUsersArgs) => {
  const extractedSelections = extractSelection(info);
  const postsIncluded = extractedSelections.includes("posts");

  if (postsIncluded) {
    return await prisma.user.findMany({ include: { posts: true } });
  }

  return await prisma.user.findMany();
};

export const getUser = async ({ id, info }: GetUserArgs) => {
  const extractedSelections = extractSelection(info);
  const postsIncluded = extractedSelections.includes("posts");

  if (postsIncluded) {
    return await prisma.user.findUnique({ where: { id }, include: { posts: true } });
  }

  return await prisma.user.findUnique({ where: { id } });
};

export const createUser = async ({ email, username }: UserInput) => {
  const createdUser = await prisma.user.create({
    data: {
      email,
      username,
    },
  });

  return createdUser;
};

export const updateUser = async (id: string, { email, username }: UserInput) => {
  if (!id) {
    fieldIdRequired();
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      email,
      username,
    },
  });

  return updatedUser;
};

export const deleteUser = async (id: string) => {
  if (!id) {
    fieldIdRequired();
  }

  const posts = await prisma.post.count({ where: { authorId: id }});

  if (posts) {
    throw new GraphQLError('The user has posts related.', {
      extensions: {
        code: 'FORBIDDEN',
      },
    });
  }

  const userExists = await prisma.user.count({ where: { id }});

  if (!userExists) {
    throw new GraphQLError('The user does not exist.', {
      extensions: {
        code: 'BAD_REQUEST',
      },
    });
  }

  const deletedUser = await prisma.user.delete({ where: { id }});

  return deletedUser;
};
