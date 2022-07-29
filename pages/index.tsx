import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Login from "../components/login";

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
            gap: 2,
            mt: 4,
            fontSize: "1.3rem"
          }}
        >
          <Login />
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
