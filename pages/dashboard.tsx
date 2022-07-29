import { useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  IconButton,
  Input,
  Typography
} from "@mui/material";
import { NextPage } from "next";
import Navbar from "../components/Navbar";
import Todo from "../components/Todo";
import AddIcon from "@mui/icons-material/Add";
import { useUser } from "@auth0/nextjs-auth0";
import { Task } from "../types";
import axios from "axios";
import useSWR from "swr";

const Dashboard: NextPage = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState<Task[]>([]);
  const [authorId, setAuthorId] = useState<number | null>(null);

  const { user, error: errorUser, isLoading } = useUser();

  const { data, error } = useSWR(
    isLoading ? null : "api/endpoints/getallusers",
    async url => {
      const res = await axios.get<{ authorId: string; tasks: any[] }>(url);

      setTodos(res.data.tasks);
      setAuthorId(Number(res.data.authorId));
      return res.data;
    }
  );

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2rem"
        }}
      >
        <CircularProgress size="100px" />
      </Box>
    );
  }

  if (error) {
    return <div>There was an error loading your tasks.</div>;
  }

  return (
    <>
      <Navbar name={user?.name ? user.name : ""} />
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
              id="inputtask"
            />
            <IconButton
              onClick={async () => {
                try {
                  await axios.post(`api/endpoints/addtask`, {
                    title: task,
                    authorId
                  });
                } catch (error) {
                  // toast
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
            {todos.map((todo, index) => {
              return (
                <Todo
                  key={index}
                  id={todo.id}
                  done={todo.done}
                  title={todo.title}
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
