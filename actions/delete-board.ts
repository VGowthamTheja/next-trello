"use server";

import { z } from "zod";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const deleteBoardSchema = z.object({
  id: z.string(),
});

export async function deleteBoard(id: string) {
  await db.board.delete({
    where: {
      id,
    },
  });

  revalidatePath("/organization/org_2YG71R1YL0i9xXWj4BQPw4DO1D2");
}
