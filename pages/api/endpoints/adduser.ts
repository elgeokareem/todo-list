import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import type { AddUser } from "../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.body as AddUser;

  try {
    await prisma.user.create({
      data: {
        email: email
      }
    });

    res.status(201).send("user created");
  } catch (error) {
    res.status(500).send(error);
  }
}
