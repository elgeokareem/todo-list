import * as React from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "../components/Link";
import ProTip from "../components/ProTip";
import Copyright from "../components/Copyright";
import Login from "../components/login";
import Logout from "../components/logout";

const Home: NextPage = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Keep track of your tasks!
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2
          }}
        >
          <Login />
          <Logout />
        </Box>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
};

export default Home;
