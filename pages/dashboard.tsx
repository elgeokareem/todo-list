import { useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  IconButton,
  Input,
  Typography
} from "@mui/material";
import axios from "axios";
import Navbar from "../components/Navbar";
import Todo from "../components/Todo";
import AddIcon from "@mui/icons-material/Add";
import { NextPage } from "next";
import { useUser } from "@auth0/nextjs-auth0";
import { useFetch } from "../hooks/useFetch";
import { addTodo } from "../utils/fetchUtils";
import type { GetDataServer, Task } from "../types";

const Dashboard: NextPage = () => {
  const [task, setTask] = useState("");

  const { user, error: errorUser, isLoading } = useUser();

  const { data, isLoadingData, errorFetch, mutate } = useFetch(isLoading);

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

  if (errorFetch) {
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
                  const newTodo = {
                    title: task,
                    authorId: data?.authorId
                  } as any as Task;

                  axios.post(`api/endpoints/addtask`, newTodo);

                  if (data) {
                    mutate(addTodo(data, newTodo), {
                      rollbackOnError: true,
                      populateCache: true,
                      revalidate: false
                    });
                  }

                  setTask("");
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
            {data?.tasks.map((todo, index) => {
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
