import { NextApiRequest, NextApiResponse } from "next";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import prisma from "../../../lib/prisma";
import type { AddTask } from "../../../types";

// export default withApiAuthRequired(async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     const session = getSession(req, res);
//     console.log("session", session);
//     const authHeader = req.headers.authorization;

//     console.log("pasa por el server", authHeader);

//     res.status(200);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const authHeader = req.headers.authorization;
    console.log("pasa por el server", authHeader);
    if (req.method !== "GET") {
      res.status(405).send("Method not allowed");
    }

    const userEmail = "elkareem123@gmail.com";

    const user = await prisma.user.findUnique({
      where: {
        email: userEmail
      }
    });
    const userId = user?.id;

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
    res.status(500).send(error);
  }
}
