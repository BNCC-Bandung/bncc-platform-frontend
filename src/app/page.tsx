import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <Button>
          <Link href="/login">Login</Link>
        </Button>
        <Button>
          <Link href="/register">Register</Link>
        </Button>
        <Button>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      </div>
    </>
  );
}
