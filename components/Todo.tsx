import { Build, Delete } from "@mui/icons-material";
import { Box, Checkbox, IconButton, Paper } from "@mui/material";
import { NextPage } from "next";
import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { deleteTodo, editTodo } from "../utils/fetchUtils";
import EditTodo from "./EditTodo";
import axios from "axios";
import type { TodoProp } from "../types";

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
            backgroundColor: done ? "#f5f5f5" : "white",
            width: "100%"
          }}
        >
          <span
            style={{
              textDecoration: done ? "line-through" : "none"
            }}
          >
            {title}
          </span>

          <Checkbox
            checked={done}
            style={{ marginLeft: "auto" }}
            onChange={async e => {
              const editedTodo = {
                done: e.target.checked
              };

              axios.patch(`api/endpoints/edittask/${id}`, editedTodo);

              if (data) {
                mutate(editTodo(data, { id, done: e.target.checked }), {
                  rollbackOnError: true,
                  populateCache: true,
                  revalidate: false
                });
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
              axios.delete(`api/endpoints/deletetask/${id}`);

              if (data) {
                mutate(deleteTodo(data, id), {
                  rollbackOnError: true,
                  populateCache: true,
                  revalidate: false
                });
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
