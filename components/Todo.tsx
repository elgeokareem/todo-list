import { Build, Delete } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  Grid,
  IconButton,
  Paper,
  Typography
} from "@mui/material";
import { NextPage } from "next";
import { useState } from "react";
import EditTodo from "./EditTodo";
import type { TodoProp } from "../types";
import { useRouter } from "next/router";
import axios from "axios";

const styles = {
  Icon: {
    marginLeft: "auto"
  },
  Paper: {
    margin: "auto",
    padding: 10,
    display: "flex",
    alignItems: "center",
    marginTop: 10,
    width: 500
  }
};

const Todo: NextPage<TodoProp> = ({ id, done, title }) => {
  const [check, setCheck] = useState(done);
  const [edit, setEdit] = useState(false);
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  if (!edit) {
    return (
      <Box>
        <Paper
          elevation={2}
          style={styles.Paper}
          sx={{
            backgroundColor: check ? "#f5f5f5" : "white"
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
              const res = await axios.patch(`api/endpoints/edittask/${id}`, {
                done: e.target.checked
              });

              // Request successful.
              if (res.status < 300) {
                setCheck(!e.target.checked);
                refreshData();
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
                refreshData();
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
