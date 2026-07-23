import LoginForm from "../../components/auth/LoginForm";

export default function StaffLogin() {
  return (
    <LoginForm
      title="Staff Login"
      subtitle="Sign in to access your staff account."
      buttonColor="bg-[#C89B3C] hover:bg-[#b3872f]"
      accentColor="#C89B3C"
        role="staff"
    />
  );
}