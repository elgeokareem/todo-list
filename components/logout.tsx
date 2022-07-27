import Link from "./Link";

const LogoutButton = () => {
  return (
    <Link href="/api/auth/logout" color="secondary">
      Logout
    </Link>
  );
};

export default LogoutButton;
