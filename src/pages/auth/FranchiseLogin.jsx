import LoginForm from "../../components/auth/LoginForm";

export default function FranchiseLogin() {
  return (
    <LoginForm
      title="Franchise Login"
      subtitle="Sign in to access your franchise account."
      buttonColor="bg-blue-600 hover:bg-blue-700"
      accentColor="#2563EB"
       role="franchise"

    />
  );
}