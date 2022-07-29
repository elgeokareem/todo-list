import Link from "./Link";

const LoginButton = () => {
  return (
    <Link href="/api/auth/login" color="secondary" id="login">
      Enter the app!
    </Link>
  );
};

export default LoginButton;
