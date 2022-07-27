import { useState } from "react";
import {
  withPageAuthRequired,
  useUser,
  UserProfile,
  getSession
} from "@auth0/nextjs-auth0";
import { Box, Container, IconButton, Input, Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Todo from "../components/Todo";
import AddIcon from "@mui/icons-material/Add";
import prisma from "../lib/prisma";
import axios from "axios";
import type { InputProps } from "../types";

function userName(userObject: UserProfile | undefined) {
  if (userObject) {
    if (userObject.nickname) {
      return userObject.nickname;
    }
  }
  return "";
}

const Dashboard: NextPage<InputProps> = ({ tasks }) => {
  const [task, setTask] = useState("");
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <Navbar name={userName(user)} />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Box
          sx={{
            width: "90%",
            maxWidth: "500px"
          }}
        >
          <Typography variant="h2" mt={4}>
            Dashboard
          </Typography>

          <Box
            mt={4}
            sx={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <Input
              onChange={e => {
                setTask(e.target.value);
              }}
              placeholder="Add a task"
              value={task}
            />
            <IconButton
              onClick={async () => {
                const res = await axios.post(`api/endpoints/addtask`, {
                  title: task,
                  authorId: tasks.authorId
                });

                // Request successful.
                if (res.status < 300) {
                  refreshData();
                  setTask("");
                }
              }}
            >
              <AddIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {tasks.tasks.map((task, index) => {
              return (
                <Todo
                  key={index}
                  id={task.id}
                  done={task.done}
                  title={task.title}
                />
              );
            })}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Dashboard;

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req, res }) {
    try {
      const session = getSession(req, res);

      if (!session) {
        // TODO: redirect to login page
      }

      const userEmail = session?.user?.email as string;

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

      return {
        props: {
          tasks: {
            authorId: userId,
            tasks: JSON.parse(JSON.stringify(tasks))
          }
        }
      };
    } catch (error) {
      return {
        props: {
          tasks: {
            authorId: 1,
            tasks: [{ id: 1, title: "", done: false, authorId: 1 }]
          }
        }
      };
    }
  }
});
