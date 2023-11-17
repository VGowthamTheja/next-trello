"use server";

import { auth } from "@clerk/nextjs";
import { OutputType, InputType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { createBoardSchema } from "./schema";

const handler = async (data: InputType): Promise<OutputType> => {
  const { userId } = auth();

  if (!userId) {
    return {
      error: "You must be logged in to create a board",
    };
  }

  const { title } = data;

  let board;

  try {
    board = await db.board.create({
      data: {
        title,
      },
    });
  } catch (error: any) {
    return {
      error: error.message,
    };
  }

  revalidatePath(`board/${board.id}`);
  return { result: board };
};

export const createBoard = createSafeAction(createBoardSchema, handler);
