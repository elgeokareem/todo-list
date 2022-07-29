import { Save } from "@mui/icons-material";
import { Box, IconButton, Input, Paper } from "@mui/material";
import axios from "axios";
import { NextPage } from "next";
import { useState } from "react";
import { TodoPropEdit } from "../types";
import { useFetch } from "../hooks/useFetch";
import { editTodo } from "../utils/fetchUtils";

const styles = {
  Icon: {
    marginLeft: "auto",
    width: "10%"
  },
  Paper: {
    margin: "auto",
    padding: 10,
    alignItems: "center",
    marginTop: 10,
    width: 500
  }
};

const EditTodo: NextPage<TodoPropEdit> = ({ id, done, title, setEdit }) => {
  const [titleEdit, setTitleEdit] = useState(title);
  const { data, errorFetch, mutate } = useFetch();

  return (
    <Box>
      <Paper elevation={2} style={styles.Paper}>
        <form
          style={{
            display: "flex",
            width: "100%",
            backgroundColor: done ? "#f5f5f5" : "white"
          }}
        >
          <Input
            style={{ width: "90%" }}
            defaultValue={title}
            onChange={e => {
              setTitleEdit(e.target.value);
            }}
          />
          <IconButton
            type="submit"
            color="primary"
            aria-label="Add"
            onClick={async e => {
              e.preventDefault();
              axios.patch(`api/endpoints/edittask/${id}`, {
                title: titleEdit
              });

              if (data) {
                mutate(editTodo(data, { id, title: titleEdit }), {
                  rollbackOnError: true,
                  populateCache: true,
                  revalidate: false
                });
              }

              setTitleEdit("");
              setEdit(false);
            }}
          >
            <Save fontSize="small" />
          </IconButton>
        </form>
      </Paper>
    </Box>
  );
};

export default EditTodo;
