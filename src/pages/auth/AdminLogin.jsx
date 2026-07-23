import LoginForm from "../../components/auth/LoginForm";

export default function AdminLogin() {
  return (
    <LoginForm
      title="Administrator Login"
      subtitle="Sign in to access the NOOH Admin Portal."
     buttonColor="bg-green-700 hover:bg-green-800"
accentColor="#15803D"
  role="admin"
    />
  );
}