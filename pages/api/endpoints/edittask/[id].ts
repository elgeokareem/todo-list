import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import type { EditTask } from "../../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const updateData: EditTask = req.body;
  const query = req.query;
  const taskId = query.id as string;

  try {
    const newTask = await prisma.task.update({
      where: {
        id: Number(taskId)
      },
      data: {
        ...updateData
      }
    });

    console.log("updated successfully", newTask);

    res.status(200).send("updated successfully");
  } catch (error) {
    console.log("error in update", error);
    res.status(500).send("Error in update");
  }
}
