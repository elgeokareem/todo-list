import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import type { EditTask } from "../../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query;
  const taskId = query.id as string;

  try {
    await prisma.task.delete({
      where: {
        id: Number(taskId)
      }
    });

    res.status(200).send("deleted successfully");
  } catch (error) {
    res.status(500).send("Error in update");
  }
}
