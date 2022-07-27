import Link from "./Link";

const LoginButton = () => {
  return (
    <Link href="/api/auth/login" color="secondary">
      Login
    </Link>
  );
};

export default LoginButton;
