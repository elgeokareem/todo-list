import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import NextLink from "next/link";
import { Link as MUILink } from "@mui/material";

export default function Navbar({ name }: { name: string }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {name}
          </Typography>
          <NextLink href="/api/auth/logout" passHref>
            <MUILink
              color="#fff"
              sx={{
                textDecoration: "none"
              }}
            >
              LOGOUT
            </MUILink>
          </NextLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
