import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import type { AddUser } from "../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body);
  const { email } = req.body as AddUser;

  await prisma.user.create({
    data: {
      email: email
    }
  });

  res.status(200);
}
