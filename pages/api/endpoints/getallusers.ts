import { NextApiRequest, NextApiResponse } from "next";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import prisma from "../../../lib/prisma";
import type { AddTask } from "../../../types";

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "GET") {
      res.status(405).send("Method not allowed");
    }

    const session = getSession(req, res);

    if (!session) {
      return res.status(401).send("No session");
    }

    const userEmail = session.user.email;

    const user = await prisma.user.findUnique({
      where: {
        email: userEmail
      }
    });

    if (!user) {
      return res.status(401).send("No user");
    }

    const userId = user.id;

    const tasks = await prisma.task.findMany({
      where: {
        authorId: userId
      }
    });

    const data = {
      authorId: userId,
      tasks
    };

    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
