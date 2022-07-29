import { Build, Delete } from "@mui/icons-material";
import { Box, Checkbox, IconButton, Paper } from "@mui/material";
import { NextPage } from "next";
import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import EditTodo from "./EditTodo";
import axios from "axios";
import type { GetDataServer, TodoProp } from "../types";

const styles = {
  Icon: {
    marginLeft: "auto"
  },
  Paper: {
    margin: "auto",
    padding: 10,
    display: "flex",
    alignItems: "center",
    marginTop: 10
  }
};

const Todo: NextPage<TodoProp> = ({ id, done, title }) => {
  const [check, setCheck] = useState(done);
  const [edit, setEdit] = useState(false);
  const { data, errorFetch, mutate } = useFetch();

  if (!edit) {
    return (
      <Box
        sx={{
          width: "100%"
        }}
      >
        <Paper
          elevation={2}
          style={styles.Paper}
          sx={{
            backgroundColor: check ? "#f5f5f5" : "white",
            width: "100%"
          }}
        >
          <span
            style={{
              textDecoration: check ? "line-through" : "none"
            }}
          >
            {title}
          </span>

          <Checkbox
            checked={check}
            style={{ marginLeft: "auto" }}
            onChange={async e => {
              const editedTodo = {
                done: e.target.checked
              };

              await axios.patch(`api/endpoints/edittask/${id}`, editedTodo);

              if (data) {
                const newData: GetDataServer = {
                  authorId: data.authorId,
                  tasks: data.tasks.map(todo => {
                    if (todo.id === id) {
                      return { ...todo, done: e.target.checked };
                    }

                    return todo;
                  })
                };
                mutate(newData);
                setCheck(!e.target.checked);
              }
            }}
          />
          <IconButton
            color="primary"
            aria-label="Edit"
            onClick={() => setEdit(true)}
          >
            <Build fontSize="small" />
          </IconButton>
          <IconButton
            color="secondary"
            aria-label="Delete"
            onClick={async e => {
              e.preventDefault();
              const res = await axios.delete(`api/endpoints/deletetask/${id}`);

              // Request successful.
              if (res.status < 300) {
                // refreshData();
              }
            }}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Paper>
      </Box>
    );
  }

  return <EditTodo id={id} title={title} done={done} setEdit={setEdit} />;
};

export default Todo;
