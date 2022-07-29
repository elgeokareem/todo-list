import { Button } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import Link from "./Link";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button onClick={() => loginWithRedirect()} color="secondary" id="login">
      Enter the app!
    </Button>
  );
};

export default LoginButton;
