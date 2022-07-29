import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    res.status(405).send("Method not allowed");
  }

  const session = getSession(req, res);

  if (!session) {
    return res.status(401).send("No session");
  }

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
});
