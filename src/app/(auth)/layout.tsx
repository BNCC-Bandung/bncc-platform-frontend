import Footer from "@/components/misc/footer";
import Header from "@/components/misc/header";
import Navigation from "@/components/misc/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Navigation />
      <div className="min-h-screen bg-background font-sans antialiased">
        {children}
      </div>
      <Footer />
    </>
  );
}
