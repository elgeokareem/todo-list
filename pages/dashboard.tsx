import { useState } from "react";
import { Box, Container, IconButton, Input, Typography } from "@mui/material";
import { NextPage } from "next";
import Navbar from "../components/Navbar";
import Todo from "../components/Todo";
import AddIcon from "@mui/icons-material/Add";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import useSWR from "swr";

const Dashboard: NextPage = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState<any[]>([]);
  const [authorId, setAuthorId] = useState<number | null>(null);

  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  const { data, error } = useSWR(
    isLoading || !isAuthenticated
      ? null
      : "http://localhost:3000/api/endpoints/getallusers",
    async url => {
      const accessToken = await getAccessTokenSilently();
      const res = await axios.get<{ authorId: string; tasks: any[] }>(url, {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      });

      setTodos(res.data.tasks);
      setAuthorId(Number(res.data.authorId));
      return res.data;
    }
  );

  if (isLoading) {
    return <div>Loading your user information...</div>;
  }

  if (!isAuthenticated) {
    return <div>You must first sign in to access your subscriptions.</div>;
  }

  if (error) {
    return <div>There was an error loading your subscriptions.</div>;
  }

  if (!data) {
    return (
      <div>
        <h1>Subscriptions for {user?.email}</h1>
        <div>Loading your subscriptions ...</div>
      </div>
    );
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
                const res = await axios.post(`api/endpoints/addtask`, {
                  title: task,
                  authorId
                });
                // Request successful.
                if (res.status < 300) {
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
