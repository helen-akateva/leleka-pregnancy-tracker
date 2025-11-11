import type { Metadata } from "next";
import { Comfortaa, Lato } from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "300", "700", "900"],
  variable: "--font-family",
  display: "swap",
});

const comfortaa = Comfortaa({
  subsets: ["cyrillic"],
  weight: ["700"],
  variable: "--second-family",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Leleka",
  description: "Main page of Leleka website for pregnant moms ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`${lato.variable} ${comfortaa.variable}`}>
        <TanStackProvider>
          <AuthProvider>{children}</AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
