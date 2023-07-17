import "app/globals.css";
import Nav from "components/Nav";
import Footer from "components/Footer";

import type { ISummary } from "loaders/summary";

export default function RootLayout({
  summary,
  children,
}: {
  children: React.ReactNode;
  summary: ISummary;
}) {
  return (
    <>
      <Nav />
      <main className="pt-2">
        <div className="container mx-auto">{children}</div>
      </main>
      <Footer summary={summary} />
    </>
  );
}
