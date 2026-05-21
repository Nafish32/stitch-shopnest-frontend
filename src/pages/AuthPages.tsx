import { LockKeyhole, Mail, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { user } from "../mocks/users";
import { useAuthStore } from "../stores/authStore";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}

function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <main className="flex min-h-[calc(100vh-220px)] items-center justify-center px-4 py-12">
      <section className="w-full max-w-md rounded-xl bg-white p-6 shadow-soft">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-soft text-navy-950">
          <LockKeyhole />
        </div>
        <h1 className="mt-4 text-center font-heading text-3xl font-extrabold">{title}</h1>
        <p className="mt-2 text-center text-sm text-slate-600">{subtitle}</p>
        <div className="mt-6 space-y-4">{children}</div>
        <div className="mt-5 text-center text-sm text-slate-600">{footer}</div>
      </section>
    </main>
  );
}

export function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  return (
    <AuthCard title="Login" subtitle="Access your ShopNest account." footer={<>New here? <Link className="font-bold text-amber-700" to="/register">Create an account</Link></>}>
      <Input label="Email" type="email" placeholder="you@example.com" />
      <Input label="Password" type="password" placeholder="••••••••" />
      <Button fullWidth onClick={() => { login(user, "mock-token"); navigate("/account"); }}>Login</Button>
      <Link className="block text-center text-sm font-bold text-amber-700" to="/forgot-password">Forgot password?</Link>
    </AuthCard>
  );
}

export function RegisterPage() {
  return (
    <AuthCard title="Register" subtitle="Create your account for faster checkout." footer={<>Already registered? <Link className="font-bold text-amber-700" to="/login">Login</Link></>}>
      <Input label="Full name" placeholder="Your name" />
      <Input label="Email" type="email" placeholder="you@example.com" />
      <Input label="Password" type="password" placeholder="Create password" />
      <Button fullWidth><UserPlus size={17} /> Create Account</Button>
    </AuthCard>
  );
}

export function ForgotPasswordPage() {
  return (
    <AuthCard title="Forgot Password" subtitle="We will send reset instructions to your inbox." footer={<Link className="font-bold text-amber-700" to="/login">Back to login</Link>}>
      <Input label="Email" type="email" placeholder="you@example.com" />
      <Button fullWidth><Mail size={17} /> Send Reset Link</Button>
    </AuthCard>
  );
}
