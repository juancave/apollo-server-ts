import { PrismaClient } from "@prisma/client";
import { extractSelection } from "../utils/extractSelections";
import { GraphQLResolveInfo } from "graphql";

interface GetPostsArgs {
  info: GraphQLResolveInfo;
}

interface GetUserArgs extends GetPostsArgs {
  id: string;
}

const prisma = new PrismaClient();

export const getPosts = async ({ info }: GetPostsArgs) => {
  const extractedSelections = extractSelection(info);
  const authorIncluded = extractedSelections.includes("author");

  if (authorIncluded) {
    return await prisma.post.findMany({ include: { author: true } });
  }

  return await prisma.post.findMany();
};

export const getPost = async ({ id, info }: GetUserArgs) => {
  const extractedSelections = extractSelection(info);
  const authorIncluded = extractedSelections.includes("author");

  if (authorIncluded) {
    return await prisma.post.findUnique({ where: { id }, include: { author: true } });
  }

  return await prisma.post.findUnique({ where: { id } });
};
