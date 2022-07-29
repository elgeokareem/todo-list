import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import type { EditTask } from "../../../../types";

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    res.status(405).send("Method not allowed");
  }

  const session = getSession(req, res);

  if (!session) {
    return res.status(401).send("No session");
  }

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

    res.status(200).send("updated successfully");
  } catch (error) {
    res.status(500).send("Error in update");
  }
});
