import LoginForm from "../components/Layout/LoginForm";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <LoginForm />
    </div>
  );
}
