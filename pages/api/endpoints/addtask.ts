import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import type { AddTask } from "../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body);
  const newTaskObject: AddTask = req.body;

  const newTask = await prisma.task.create({
    data: {
      ...newTaskObject
    }
  });

  console.log("created successfully", newTask);

  res.status(201);
}
