import "app/globals.css";
import Nav from "components/Nav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main>
        <div className="container mx-auto">{children}</div>
      </main>
    </>
  );
}
