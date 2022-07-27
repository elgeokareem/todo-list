import { Button } from "@mui/material";
import Link from "./Link";

const LoginButton = () => {
  return (
    <Link href="/api/auth/login" color="secondary">
      Enter the app!
    </Link>
  );
};

export default LoginButton;
