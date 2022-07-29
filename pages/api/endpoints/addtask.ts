import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import type { AddTask } from "../../../types";

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).send("Method not allowed");
  }

  const session = getSession(req, res);

  if (!session) {
    return res.status(401).send("No session");
  }

  const newTaskObject: AddTask = req.body;

  try {
    await prisma.task.create({
      data: {
        ...newTaskObject
      }
    });

    res.status(201).send("Task created successfully");
  } catch (error) {
    res.status(500).send(error);
  }
});
