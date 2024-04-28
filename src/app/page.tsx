import { LoginForm } from "@/components/login/login-form";
import Footer from "@/components/misc/footer";

export default function Page() {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <LoginForm />
      </div>

      <Footer />
    </>
  );
}
