import { Save } from "@mui/icons-material";
import { Box, Grid, IconButton, Input, Paper } from "@mui/material";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { TodoPropEdit } from "../types";

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
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

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
              const res = await axios.patch(`api/endpoints/edittask/${id}`, {
                title: titleEdit
              });

              // Request successful.
              if (res.status < 300) {
                setTitleEdit("");
                setEdit(false);
                refreshData();
              }
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
