import Footer from "@/components/misc/footer";
import Header from "@/components/misc/header";

export const revalidate = 60 * 15;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-3.5rem)] bg-background font-sans antialiased">
        {children}
      </div>
      <Footer />
    </>
  );
}
