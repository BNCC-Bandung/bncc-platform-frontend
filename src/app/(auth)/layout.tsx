import { getProfile } from "@/api/course-context";
import Footer from "@/components/misc/footer";
import Header from "@/components/misc/header";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // make sure to call getProfile() before rendering the children
  await getProfile();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background font-sans antialiased">
        {children}
      </div>
      <Footer />
    </>
  );
}
